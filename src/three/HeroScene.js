import * as THREE from 'three'

export default function createHeroScene(scene, camera, renderer) {
    // Mobile check
    const isLowEnd = navigator.hardwareConcurrency < 4 || /Android|iPhone/i.test(navigator.userAgent)
    const NODE_COUNT = isLowEnd ? 40 : 80
    const EDGE_COUNT = isLowEnd ? 60 : 120

    // 1. Nodes (Particles)
    const nodeGeo = new THREE.SphereGeometry(0.05, 8, 8)
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x0A0A0A })
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT)

    // Random positions & phase offsets for animation
    const dummy = new THREE.Object3D()
    const phases = new Float32Array(NODE_COUNT)
    const positions = [] // Store for edge creation

    for (let i = 0; i < NODE_COUNT; i++) {
        const x = (Math.random() - 0.5) * 6
        const y = (Math.random() - 0.5) * 6
        const z = (Math.random() - 0.5) * 6

        dummy.position.set(x, y, z)
        dummy.updateMatrix()
        nodes.setMatrixAt(i, dummy.matrix)

        positions.push(new THREE.Vector3(x, y, z))
        phases[i] = Math.random() * Math.PI * 2
    }
    nodes.instanceMatrix.needsUpdate = true
    scene.add(nodes)

    // 2. Edges (Connecting Lines)
    const edgePositions = new Float32Array(EDGE_COUNT * 2 * 3)
    const edgeGeo = new THREE.BufferGeometry()
    const edgeMat = new THREE.LineBasicMaterial({
        color: 0x888888,
        transparent: true,
        opacity: 0.25
    })

    // Create random connections
    for (let i = 0; i < EDGE_COUNT; i++) {
        const startNode = Math.floor(Math.random() * NODE_COUNT)
        let endNode = Math.floor(Math.random() * NODE_COUNT)
        while (endNode === startNode) endNode = Math.floor(Math.random() * NODE_COUNT)

        const index = i * 6 // 2 vertices * 3 coords
        edgePositions[index] = positions[startNode].x
        edgePositions[index + 1] = positions[startNode].y
        edgePositions[index + 2] = positions[startNode].z

        edgePositions[index + 3] = positions[endNode].x
        edgePositions[index + 4] = positions[endNode].y
        edgePositions[index + 5] = positions[endNode].z
    }

    edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3))
    const edges = new THREE.LineSegments(edgeGeo, edgeMat)
    scene.add(edges)

    // Camera settings
    camera.position.z = 5

    // Mouse Parallax interacton
    let targetX = 0
    let targetY = 0
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const onMouseMove = (e) => {
        if (hasTouch) return
        targetX = (e.clientX / window.innerWidth - 0.5) * 0.3
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    if (!hasTouch) {
        window.addEventListener('mousemove', onMouseMove)
    }

    // Animation Loop
    let time = 0
    const animate = (delta) => {
        time += delta

        // Parallax rotation (lerp)
        if (!hasTouch) {
            scene.rotation.y += (targetX - scene.rotation.y) * 0.05
            scene.rotation.x += (targetY - scene.rotation.x) * 0.05
        }

        // Node pulsing
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.getMatrixAt(i, dummy.matrix)
            dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)

            const scale = 1.0 + Math.sin(time * 2 + phases[i]) * 0.2
            dummy.scale.set(scale, scale, scale)

            dummy.updateMatrix()
            nodes.setMatrixAt(i, dummy.matrix)
        }
        nodes.instanceMatrix.needsUpdate = true
    }

    // Cleanup Function
    const cleanup = () => {
        if (!hasTouch) {
            window.removeEventListener('mousemove', onMouseMove)
        }
        nodeGeo.dispose()
        nodeMat.dispose()
        edgeGeo.dispose()
        edgeMat.dispose()
    }

    return { animate, cleanup }
}
