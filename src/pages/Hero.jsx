import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import PageTransition from '../components/PageTransition'
import { useThree } from '../hooks/useThree'
import createHeroScene from '../three/HeroScene'

export default function Hero() {
    const mountRef = useRef(null)

    // Initialize Three.js Neural Network Scene
    useThree(mountRef, createHeroScene)

    // GSAP Entrance Animations
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

        tl.fromTo('.hero-name',
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.04 },
            0.3
        )
            .fromTo('.hero-role',
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7 },
                0.8
            )
            .fromTo('.hero-desc span',
                { opacity: 0 },
                { opacity: 1, duration: 0.05, stagger: 0.05 },
                1.2
            )
            .fromTo('.hero-cta',
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
                1.8
            )
            .fromTo('.scroll-indicator',
                { opacity: 0, y: -10 },
                {
                    opacity: 0.5, y: 0, duration: 1, onComplete: () => {
                        gsap.to('.scroll-indicator', {
                            y: 10, repeat: -1, yoyo: true, duration: 1, ease: 'power1.inOut'
                        })
                    }
                },
                2.5
            )

        return () => tl.kill()
    }, [])

    return (
        <PageTransition>
            <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center px-6">

                {/* Three.js Background Canvas */}
                <div
                    ref={mountRef}
                    className="absolute inset-0 z-0 pointer-events-auto"
                />

                {/* Foreground Content */}
                <div className="relative z-10 max-w-3xl flex flex-col items-center pointer-events-none">

                    <h1 className="font-display font-bold text-ink tracking-tighter leading-none mb-4 flex overflow-hidden">
                        {"Dev Narola".split('').map((char, i) => (
                            <span key={i} className={`hero-name inline-block ${char === ' ' ? 'w-[clamp(12px,2vw,24px)]' : ''}`} style={{ fontSize: 'var(--text-3xl)' }}>
                                {char}
                            </span>
                        ))}
                    </h1>

                    <div className="hero-role text-mid-gray tracking-[6px] uppercase font-sans font-light mb-6 flex items-center" style={{ fontSize: 'clamp(18px, 3vw, 32px)' }}>
                        AI Engineer
                    </div>

                    <div className="w-16 h-[1px] bg-accent mb-6 opacity-50" />

                    <p className="hero-desc font-sans text-dark-gray max-w-[520px] mb-12 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)' }}>
                        {"Building production-scale AI systems with LLMs, RAG & Neural Networks".split(' ').map((word, i) => (
                            <span key={i} className="inline-block mr-1">{word}</span>
                        ))}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
                        <a
                            href="/work"
                            className="hero-cta group relative px-8 py-3 bg-ink text-white font-mono text-sm uppercase tracking-widest overflow-hidden"
                            data-cursor="hover"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Work
                                <span className="transform transition-transform group-hover:translate-x-1">→</span>
                            </span>
                            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </a>

                        <a
                            href="/Dev-Narola-Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-cta group px-8 py-3 bg-transparent text-ink border border-ink font-mono text-sm uppercase tracking-widest transition-colors duration-300 hover:bg-light-gray"
                            data-cursor="hover"
                        >
                            Resume <span className="inline-block transform transition-transform group-hover:translate-y-1">↓</span>
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-mid-gray pointer-events-none z-10">
                    <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-8 bg-mid-gray opacity-50" />
                </div>

            </section>
        </PageTransition>
    )
}
