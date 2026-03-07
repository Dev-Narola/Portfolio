import * as THREE from 'three'

export default function createWorkScene(scene, camera, renderer) {
    // Mobile check
    const isLowEnd = navigator.hardwareConcurrency < 4 || /Android|iPhone/i.test(navigator.userAgent)
    const PARTICLE_COUNT = isLowEnd ? 75 : 150

    // 1. Particle Geometry
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
    const particleVelocities = []

    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
        // Spread widely across X and Y, deep into Z
        particlePositions[i] = (Math.random() - 0.5) * 10
        particlePositions[i + 1] = (Math.random() - 0.5) * 10
        particlePositions[i + 2] = (Math.random() - 0.5) * 10

        particleVelocities.push({
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        })
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    // 2. Material (White particles, dark atmosphere)
    const particleMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.03, // Tiny points
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending // gives it a subtle glow
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Camera settings
    camera.position.z = 5

    // 3. Animation Loop
    let time = 0
    const animate = (delta) => {
        time += delta

        // Slow atmospheric drift
        const positions = particleGeo.attributes.position.array
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const idx = i * 3
            positions[idx] += particleVelocities[i].x
            positions[idx + 1] += particleVelocities[i].y
            positions[idx + 2] += Math.sin(time + i) * 0.005 // wavy Z motion

            // Reset bounds if they drift too far out
            if (Math.abs(positions[idx]) > 5) positions[idx] *= -0.9
            if (Math.abs(positions[idx + 1]) > 5) positions[idx + 1] *= -0.9
            if (positions[idx + 2] > 3) positions[idx + 2] = -4
        }

        particleGeo.attributes.position.needsUpdate = true

        // Slow whole scene rotation
        scene.rotation.y = time * 0.05
        scene.rotation.x = time * 0.02
    }

    // Cleanup Function
    const cleanup = () => {
        particleGeo.dispose()
        particleMat.dispose()
    }

    return { animate, cleanup }
}
