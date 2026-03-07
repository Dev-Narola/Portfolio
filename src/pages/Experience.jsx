import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PageTransition from '../components/PageTransition'
import { experience } from '../data/experience'
import { useThree } from '../hooks/useThree'
import createAboutBackgroundScene from '../three/AboutBackgroundScene'

export default function Experience() {
    const bgMountRef = useRef(null)

    // Initialize Animated Interactive Background
    useThree(bgMountRef, createAboutBackgroundScene)

    // GSAP Scroll Animations
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.experience-section',
                start: 'top 60%',
            }
        })

        // Timeline center line drawing effect
        tl.fromTo('.timeline-line',
            { scaleY: 0 },
            { scaleY: 1, transformOrigin: 'top center', duration: 1.5, ease: 'power3.out' }
        )

        // Fade in entries consecutively
        gsap.fromTo('.exp-entry',
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.8,
                stagger: 0.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.experience-section',
                    start: 'top 50%',
                }
            }
        )

        // Stagger bullet points inside each entry
        const entries = document.querySelectorAll('.exp-entry')
        entries.forEach((entry) => {
            gsap.fromTo(entry.querySelectorAll('li'),
                { x: -10, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: entry,
                        start: 'top 80%',
                    }
                }
            )
        })
    }, [])

    return (
        <PageTransition>
            <section className="experience-section relative w-full min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-white overflow-hidden">

                {/* Animated Interactive Background Canvas */}
                <div
                    ref={bgMountRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ opacity: 0.6 }}
                />

                <div className="relative z-10 w-full max-w-[1000px] mx-auto">
                    <h2 className="font-mono text-sm tracking-widest text-mid-gray uppercase mb-20 text-center">
                        // Professional Experience
                    </h2>

                    {/* Timeline Container */}
                    <div className="relative pl-6 md:pl-0">

                        {/* Vertical Line */}
                        <div className="timeline-line absolute left-[27px] md:left-[50%] top-2 bottom-2 w-px bg-light-gray transform -translate-x-1/2 z-0" />

                        <div className="space-y-24">
                            {experience.map((job, index) => {
                                const isEven = index % 2 === 0

                                return (
                                    <div key={index} className="exp-entry relative w-full flex flex-col md:flex-row justify-center items-start group">

                                        {/* Timeline Dot */}
                                        <div className="absolute left-[-5px] md:left-[calc(50%-6px)] top-2 w-3 h-3 rounded-full bg-white border-2 border-ink shadow-[0_0_0_4px_white,0_0_12px_rgba(37,99,235,0.4)] z-10 mt-1.5 transition-transform duration-300 group-hover:scale-150 group-hover:bg-accent group-hover:border-accent" />

                                        {/* Left Column (Desktop) / Top Column (Mobile) */}
                                        <div className={`w-full md:w-1/2 md:px-12 ${isEven ? 'md:text-right' : 'md:text-left md:order-last'} mb-6 md:mb-0 pl-10 md:pl-12`}>
                                            <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-ink font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                                                {job.role}
                                            </h3>
                                            <div className="font-sans text-lg text-dark-gray font-medium mb-1">
                                                {job.company}
                                            </div>
                                            <div className="font-mono text-xs text-mid-gray uppercase tracking-wider space-x-2">
                                                <span>{job.duration}</span>
                                                <span className="text-light-gray">|</span>
                                                <span>{job.location}</span>
                                            </div>
                                        </div>

                                        {/* Right Column (Desktop) / Bottom Column (Mobile) */}
                                        <div className={`w-full md:w-1/2 pl-10 md:px-12 ${isEven ? 'md:border-l md:border-transparent' : 'md:border-r md:border-transparent md:order-first'} flex flex-col justify-start`}>
                                            <ul className="space-y-4">
                                                {job.bullets.map((bullet, i) => (
                                                    <li key={i} className="font-sans text-[15px] text-dark-gray leading-relaxed relative pl-5">
                                                        {/* Custom bullet dot */}
                                                        <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-light-gray group-hover:bg-mid-gray transition-colors duration-300" />
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </section>
        </PageTransition>
    )
}
