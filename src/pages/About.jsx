import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import PageTransition from '../components/PageTransition'
import { useThree } from '../hooks/useThree'
import createAboutScene from '../three/AboutScene'
import createAboutBackgroundScene from '../three/AboutBackgroundScene'

export default function About() {
    const mountRef = useRef(null)
    const bgMountRef = useRef(null)
    const statsRef = useRef(null)

    // Initialize Three.js Icosahedron Scene
    useThree(mountRef, createAboutScene)

    // Initialize Three.js Animated Interactive Background
    useThree(bgMountRef, createAboutBackgroundScene)

    // GSAP Scroll Animations
    useEffect(() => {
        // Text reveal
        gsap.fromTo('.about-text p',
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 75%'
                }
            }
        )

        // Three.js Canvas reveal
        gsap.fromTo(mountRef.current,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1, opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 75%'
                }
            }
        )

        // Stats counter animation
        const counters = document.querySelectorAll('.stat-counter')
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'))
            gsap.to(counter, {
                innerHTML: target,
                duration: 1.5,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 85%'
                }
            })
        })
    }, [])

    return (
        <PageTransition>
            <section className="about-section relative w-full min-h-screen py-24 md:pt-32 pb-24 px-4 sm:px-6 md:px-12 bg-white overflow-hidden">

                {/* Three.js Interactive Background Canvas */}
                <div
                    ref={bgMountRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ opacity: 0.6 }}
                />

                <div className="relative z-10 max-w-[1440px] mx-auto">
                    <h2 className="font-mono text-sm tracking-widest text-mid-gray uppercase mb-16">
                        // About Me
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                        {/* LEFT: Copy */}
                        <div className="about-text flex-1 font-sans text-base md:text-lg text-dark-gray leading-relaxed space-y-6 md:space-y-8 max-w-2xl">
                            <p className="text-2xl text-ink font-medium leading-snug">
                                Hi, I'm Dev — an AI Engineer from Surat, Gujarat, currently in my final year of B.Tech in Artificial Intelligence & Data Science at A. D. Patel Institute of Technology.
                            </p>

                            <p>
                                I build production-scale AI systems: RAG pipelines that actually work, LLM agents that don't hallucinate, and ML models that ship. My current obsession is making GenAI reliable enough for regulated industries — legal, healthcare, and compliance.
                            </p>

                            <p>
                                Selected for the <span className="text-ink font-medium border-b border-light-gray">Smart India Hackathon 2025 Grand Finale</span> (top 1% of 10,000+ teams), I believe the best AI systems are invisible — they just make things work better.
                            </p>

                            <p className="font-medium text-ink">
                                When I'm not building, I'm learning. Always.
                            </p>
                        </div>

                        {/* RIGHT: Visuals & Stats */}
                        <div className="flex-1 flex flex-col items-center lg:items-end gap-16">

                            {/* Three.js Icosahedron */}
                            <div
                                ref={mountRef}
                                className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 cursor-none mx-auto lg:mx-0"
                                data-cursor="hover"
                            />

                            {/* Stats Grid */}
                            <div ref={statsRef} className="w-full max-w-md grid grid-cols-2 gap-px bg-light-gray border border-light-gray p-px">

                                <div className="bg-white p-6 flex flex-col justify-center items-center text-center group">
                                    <div className="font-display text-4xl text-ink mb-2">
                                        <span className="stat-counter" data-target="3">0</span>+
                                    </div>
                                    <div className="font-mono text-xs text-mid-gray uppercase tracking-wide">Production Projects</div>
                                </div>

                                <div className="bg-white p-6 flex flex-col justify-center items-center text-center group hover:bg-off-white transition-colors duration-300">
                                    <div className="font-display text-4xl text-ink mb-2">
                                        Top <span className="stat-counter" data-target="1">0</span>%
                                    </div>
                                    <div className="font-mono text-xs text-mid-gray uppercase tracking-wide">SIH 2025 Rank</div>
                                </div>

                                <div className="bg-white p-6 flex flex-col justify-center items-center text-center group hover:bg-off-white transition-colors duration-300">
                                    <div className="font-display text-4xl text-ink mb-2">
                                        <span className="stat-counter" data-target="87">0</span>%
                                    </div>
                                    <div className="font-mono text-xs text-mid-gray uppercase tracking-wide">ML Accuracy</div>
                                </div>

                                <div className="bg-white p-6 flex flex-col justify-center items-center text-center group hover:bg-off-white transition-colors duration-300">
                                    <div className="font-display text-4xl text-ink mb-2">
                                        <span className="stat-counter" data-target="35">0</span>%
                                    </div>
                                    <div className="font-mono text-xs text-mid-gray uppercase tracking-wide">API Cost Reduction</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}
