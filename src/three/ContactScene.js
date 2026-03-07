import * as THREE from 'three'

export default function createContactScene(scene, camera, renderer) {
    // Mobile check
    const isLowEnd = navigator.hardwareConcurrency < 4 || /Android|iPhone/i.test(navigator.userAgent)
    const PARTICLE_COUNT = isLowEnd ? 100 : 200

    // 1. Particle Geometry
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)

    // Store original positions for magnetic reset
    const originalPositions = []

    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
        const x = (Math.random() - 0.5) * 12
        const y = (Math.random() - 0.5) * 12
        const z = (Math.random() - 0.5) * 4

        particlePositions[i] = x
        particlePositions[i + 1] = y
        particlePositions[i + 2] = z

        originalPositions.push(new THREE.Vector3(x, y, z))
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    // 2. Material (Dark particles on white bg)
    const particleMat = new THREE.PointsMaterial({
        color: 0x0A0A0A,
        size: 0.04,
        transparent: true,
        opacity: 0.15
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Camera settings
    camera.position.z = 6

    // 3. Mouse Interaction (Magnetic field)
    const mouse = new THREE.Vector3(0, 0, 0.5)
    const raycaster = new THREE.Raycaster()
    const mouse2D = new THREE.Vector2(-9999, -9999) // offscreen initially

    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    let isExploding = false
    let explosionTime = 0

    const onMouseMove = (e) => {
        if (hasTouch) return
        mouse2D.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse2D.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    if (!hasTouch) {
        window.addEventListener('mousemove', onMouseMove)
    }

    // 4. Animation Loop
    let time = 0
    const animate = (delta) => {
        time += delta

        // Calculate 3D mouse position
        raycaster.setFromCamera(mouse2D, camera)
        raycaster.ray.at(5, mouse) // project 5 units away from camera

        const positions = particleGeo.attributes.position.array

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const idx = i * 3
            const px = positions[idx]
            const py = positions[idx + 1]
            const pz = positions[idx + 2]

            const particlePos = new THREE.Vector3(px, py, pz)
            const origPos = originalPositions[i]

            if (isExploding) {
                // Explosion logic: push away from center quickly
                const dir = particlePos.clone().normalize()
                particlePos.addScaledVector(dir, delta * 20)

                // End explosion after 1 second
                if (time - explosionTime > 1.0) {
                    isExploding = false
                }
            } else {
                // Magnetic logic
                const distToMouse = particlePos.distanceTo(mouse)

                if (!hasTouch && distToMouse < 2.0) { // Attraction radius
                    // Pull toward mouse
                    particlePos.lerp(mouse, 0.02)
                } else {
                    // Slowly drift back to original + some sine wave motion
                    const target = origPos.clone()
                    target.y += Math.sin(time * 0.5 + i) * 0.2
                    target.x += Math.cos(time * 0.5 + i) * 0.2

                    particlePos.lerp(target, 0.05)
                }
            }

            positions[idx] = particlePos.x
            positions[idx + 1] = particlePos.y
            positions[idx + 2] = particlePos.z
        }

        particleGeo.attributes.position.needsUpdate = true
    }

    // Callable from React component on successful form submission
    const triggerExplosion = () => {
        isExploding = true
        explosionTime = time
    }

    // Cleanup Function
    const cleanup = () => {
        if (!hasTouch) {
            window.removeEventListener('mousemove', onMouseMove)
        }
        particleGeo.dispose()
        particleMat.dispose()
    }

    return { animate, cleanup, triggerExplosion }
}
