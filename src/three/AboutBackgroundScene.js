import * as THREE from 'three'

export default function createAboutBackgroundScene(scene, camera, renderer) {
    // A grid of tiny dots taking up the background
    const isLowEnd = navigator.hardwareConcurrency < 4 || /Android|iPhone/i.test(navigator.userAgent)
    const gridSize = isLowEnd ? 30 : 65
    const spacing = 0.5

    const particleGeo = new THREE.CircleGeometry(0.012, 8)
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xd1d5db }) // Faint light gray

    const instancedMesh = new THREE.InstancedMesh(particleGeo, particleMat, gridSize * gridSize)

    const dummy = new THREE.Object3D()
    const originalPositions = []

    let idx = 0
    const offset = (gridSize * spacing) / 2

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const x = (i * spacing) - offset
            const y = (j * spacing) - offset
            const z = -2 // Push back

            dummy.position.set(x, y, z)
            dummy.updateMatrix()
            instancedMesh.setMatrixAt(idx, dummy.matrix)

            originalPositions.push(new THREE.Vector3(x, y, z))
            idx++
        }
    }

    scene.add(instancedMesh)
    camera.position.z = 5

    // Mouse tracking
    const mouse = new THREE.Vector2(-9999, -9999)
    const targetMouse = new THREE.Vector2(-9999, -9999)
    const mouse3D = new THREE.Vector3(0, 0, -2)

    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const onMouseMove = (e) => {
        if (hasTouch) return
        // Adjust mouse tracking to the element if necessary, but window is fine for full screen background
        targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1
        targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    if (!hasTouch) {
        window.addEventListener('mousemove', onMouseMove)
    }

    const raycaster = new THREE.Raycaster()
    let time = 0

    const animate = (delta) => {
        time += delta

        // Smooth mouse follow
        mouse.lerp(targetMouse, 0.1)

        // Project mouse to 3D plane at Z = -2
        raycaster.setFromCamera(mouse, camera)

        // Find intersection with Z=-2 plane
        const dir = raycaster.ray.direction
        const dist = (-2 - raycaster.ray.origin.z) / dir.z
        mouse3D.copy(raycaster.ray.origin).add(dir.multiplyScalar(dist))

        for (let i = 0; i < instancedMesh.count; i++) {
            const origPos = originalPositions[i]
            const distToMouse = origPos.distanceTo(mouse3D)

            instancedMesh.getMatrixAt(i, dummy.matrix)
            dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)

            // Displacement effect
            if (distToMouse < 2.5) {
                // Push away slightly
                const pushDir = new THREE.Vector3().subVectors(origPos, mouse3D).normalize()
                const pushStrength = (2.5 - distToMouse) * 0.15

                dummy.position.x = origPos.x + pushDir.x * pushStrength
                dummy.position.y = origPos.y + pushDir.y * pushStrength

                // Scale up based on proximity
                const scale = 1.0 + Math.pow((2.5 - distToMouse), 2) * 0.8
                dummy.scale.set(scale, scale, scale)

                // Add a very subtle wave to Z
                dummy.position.z = origPos.z + Math.sin(time * 4 + distToMouse * 2) * 0.15
            } else {
                // Smoothly return to original position
                dummy.position.lerp(origPos, 0.08)
                dummy.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08)
            }

            dummy.updateMatrix()
            instancedMesh.setMatrixAt(i, dummy.matrix)
        }

        instancedMesh.instanceMatrix.needsUpdate = true
    }

    const cleanup = () => {
        if (!hasTouch) {
            window.removeEventListener('mousemove', onMouseMove)
        }
        particleGeo.dispose()
        particleMat.dispose()
    }

    return { animate, cleanup }
}
