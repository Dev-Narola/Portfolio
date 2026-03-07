import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useThree(mountRef, setupFn) {
    const rendererRef = useRef()
    const sceneRef = useRef()
    const frameRef = useRef()

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const width = mount.clientWidth
        const height = mount.clientHeight

        // Setup basic Three.js scene
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true // transparent background to let CSS show through
        })

        // Pixel ratio optimization for high-DPI displays, capped at 2 for performance
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(width, height)
        mount.appendChild(renderer.domElement)

        sceneRef.current = scene
        rendererRef.current = renderer

        // Execute user's setup function which returns the animation and cleanup callbacks
        const setupResult = setupFn(scene, camera, renderer)
        const animate = setupResult?.animate
        const cleanup = setupResult?.cleanup

        // Animation Loop with consistent delta time
        const clock = new THREE.Clock()
        const loop = () => {
            frameRef.current = requestAnimationFrame(loop)
            if (animate) animate(clock.getDelta())
            renderer.render(scene, camera)
        }

        loop()

        // Handle responsive resize with basic debounce-like feel
        const handleResize = () => {
            if (!mountRef.current) return
            const w = mountRef.current.clientWidth
            const h = mountRef.current.clientHeight

            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        }
        window.addEventListener('resize', handleResize)

        // Guaranteed cleanup on unmount
        return () => {
            cancelAnimationFrame(frameRef.current)
            window.removeEventListener('resize', handleResize)

            if (cleanup) cleanup()

            renderer.dispose()
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [mountRef, setupFn])
}
