import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export default function PageTransition({ children }) {
    const location = useLocation()
    const wrapperRef = useRef(null)

    // This relies on React Router re-rendering this component
    // on route change. When it remounts/updates, we animate IN.

    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return

        // Initial state: hidden + shifted down
        gsap.set(el, { opacity: 0, y: 20 })

        // Animate In
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1,
            ease: 'expo.out'
        })

    }, [location.pathname]) // re-run animation on route change

    return (
        <main ref={wrapperRef} className="page-wrapper min-h-screen pt-16 relative">
            {children}
        </main>
    )
}
