import * as THREE from 'three'

export default function createAboutScene(scene, camera, renderer) {
    // Lighting (needed for MeshStandardMaterial)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    // Icosahedron Object
    const geometry = new THREE.IcosahedronGeometry(1.5, 0) // Radius 1.5, Detail 0

    // Create a group to hold fill and wireframe
    const group = new THREE.Group()

    // Solid white fill
    const fillMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 0.1
    })
    const fillMesh = new THREE.Mesh(geometry, fillMat)
    group.add(fillMesh)

    // Thin black wireframe
    const edgesGeo = new THREE.EdgesGeometry(geometry)
    const edgesMat = new THREE.LineBasicMaterial({
        color: 0x0A0A0A,
        linewidth: 1
    })
    const wireframe = new THREE.LineSegments(edgesGeo, edgesMat)
    group.add(wireframe)

    scene.add(group)

    camera.position.z = 4

    // Interaction variables
    let baseRotationSpeed = 0.003
    let targetRotationSpeed = 0.003
    let targetTiltX = 0
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const onMouseMove = (e) => {
        if (hasTouch) return
        // Simple X-axis tilt based on mouse position
        targetTiltX = (e.clientY / window.innerHeight - 0.5) * 0.5
    }

    // Hook hover states directly to the parent container later, 
    // but for global demo we can tie it to mouse move.
    if (!hasTouch) {
        window.addEventListener('mousemove', onMouseMove)
    }

    let time = 0
    const animate = (delta) => {
        time += delta

        // Continuous Y rotation
        group.rotation.y += targetRotationSpeed

        // Tilt X (lerp)
        group.rotation.x += (targetTiltX - group.rotation.x) * 0.05

        // Float up/down sine wave
        group.position.y = Math.sin(time) * 0.1
    }

    const cleanup = () => {
        if (!hasTouch) {
            window.removeEventListener('mousemove', onMouseMove)
        }
        geometry.dispose()
        fillMat.dispose()
        edgesGeo.dispose()
        edgesMat.dispose()
    }

    // We can expose a method to trigger hover state from React
    const setHoverState = (isHovered) => {
        targetRotationSpeed = isHovered ? 0.012 : baseRotationSpeed
    }

    return { animate, cleanup, setHoverState }
}
