import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import PageTransition from '../components/PageTransition'
import { useThree } from '../hooks/useThree'
import createWorkScene from '../three/WorkScene'
import createAboutBackgroundScene from '../three/AboutBackgroundScene'
import { projects } from '../data/projects'

export default function Work() {
    const mountRef = useRef(null)
    const bgMountRef = useRef(null)

    // Initialize Three.js Particle Drift Scene
    useThree(mountRef, createWorkScene)

    // Initialize Animated Interactive Background (lower opacity for dark theme)
    useThree(bgMountRef, createAboutBackgroundScene)

    // GSAP Scroll Animations
    useEffect(() => {
        // Project Cards Reveal
        gsap.fromTo('.project-card',
            { y: 60, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '.work-section',
                    start: 'top 80%',
                }
            }
        )
    }, [])

    return (
        <PageTransition>
            {/* Dark Section - specific to Work page according to PRD */}
            <section className="work-section relative w-full min-h-screen bg-dark-bg text-white overflow-hidden py-24 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center">

                {/* Animated Interactive Background Canvas */}
                <div
                    ref={bgMountRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ opacity: 0.15 }}
                />

                {/* Particle Drift Canvas */}
                <div
                    ref={mountRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                />

                <div className="relative z-10 w-full max-w-[1440px]">
                    <h2 className="font-mono text-sm tracking-widest text-[#666] uppercase mb-24">
            // Selected Work
                    </h2>

                    <div className="flex flex-col gap-8 w-full">
                        {projects.map((project) => (
                            <a
                                key={project.id}
                                href={project.live || project.github || '#'}
                                className="project-card group block w-full border border-[#222] bg-[#0A0A0A] bg-opacity-80 backdrop-blur-sm p-6 md:p-8 lg:p-12 transition-all duration-500 hover:-translate-y-2 hover:border-white hover:bg-opacity-100"
                                data-cursor="hover"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                                        <span className="text-white px-3 py-1 border border-[#333] rounded-full">{project.year}</span>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 4).map(tag => (
                                                <span key={tag} className="text-[#888]">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hidden md:block transform transition-transform duration-500 group-hover:rotate-45 group-hover:text-white text-[#666] text-2xl font-light">
                                        →
                                    </div>
                                </div>

                                <div className="mb-6 max-w-3xl">
                                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-500"
                                        style={{ backgroundImage: `linear-gradient(to right, #FFF, ${project.accent})`, WebkitBoxDecorationBreak: 'clone' }}>
                                        {project.title}
                                    </h3>
                                    <p className="font-sans text-xl md:text-2xl text-[#AAA] font-light leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-[#222]">
                                    {project.metrics.map((metric, i) => (
                                        <div key={i} className="flex items-center gap-3 font-sans text-sm text-[#888]">
                                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accent }}></span>
                                            {metric}
                                        </div>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>

                </div>
            </section>
        </PageTransition>
    )
}
