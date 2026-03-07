import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
    const dotRef = useRef()
    const ringRef = useRef()

    useEffect(() => {
        // Disable on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            if (dotRef.current) dotRef.current.style.display = 'none';
            if (ringRef.current) ringRef.current.style.display = 'none';
            return;
        }

        const dot = dotRef.current
        const ring = ringRef.current

        gsap.set(dot, { xPercent: -50, yPercent: -50 })
        gsap.set(ring, { xPercent: -50, yPercent: -50 })

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, overwrite: "auto" })
            gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.35, ease: 'power2.out', overwrite: "auto" })
        }

        window.addEventListener('mousemove', onMouseMove)

        // Interactive Hover States
        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [data-cursor]')
            if (target) {
                gsap.to(ring, { scale: 1.8, backgroundColor: 'rgba(10, 10, 10, 0.1)', borderColor: 'transparent', duration: 0.3 })
                gsap.to(dot, { scale: 0, duration: 0.2 })
            }
        }

        const handleMouseOut = (e) => {
            const target = e.target.closest('a, button, [data-cursor]')
            if (target) {
                gsap.to(ring, { scale: 1, backgroundColor: 'transparent', borderColor: '#0A0A0A', duration: 0.3 })
                gsap.to(dot, { scale: 1, duration: 0.2 })
            }
        }

        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseout', handleMouseOut)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
        }
    }, [])

    return (
        <>
            {/* Small dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full pointer-events-none z-[9999]"
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-ink pointer-events-none z-[9998]"
            />
        </>
    )
}
