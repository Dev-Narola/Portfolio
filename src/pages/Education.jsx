import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PageTransition from '../components/PageTransition'
import { education } from '../data/education'
import { useThree } from '../hooks/useThree'
import createAboutBackgroundScene from '../three/AboutBackgroundScene'

export default function Education() {
    const bgMountRef = useRef(null)

    // Initialize Animated Interactive Background
    useThree(bgMountRef, createAboutBackgroundScene)

    // GSAP Scroll Animations
    useEffect(() => {
        // Cards Reveal
        gsap.fromTo('.edu-card',
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '.education-section',
                    start: 'top 75%',
                }
            }
        )
    }, [])

    return (
        <PageTransition>
            <section className="education-section relative w-full min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-off-white overflow-hidden">

                {/* Animated Interactive Background Canvas */}
                <div
                    ref={bgMountRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ opacity: 0.6 }}
                />

                <div className="relative z-10 w-full max-w-[1440px] mx-auto">
                    <h2 className="font-mono text-sm tracking-widest text-mid-gray uppercase mb-16 text-center">
                        // Academic Foundation
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="edu-card relative bg-white border border-light-gray p-6 md:p-8 flex flex-col group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-ink"
                            >

                                {/* Header Box */}
                                <div className="mb-8">
                                    <div className="inline-block px-3 py-1 bg-off-white border border-light-gray font-mono text-[10px] uppercase tracking-widest text-mid-gray mb-4 rounded-sm">
                                        {edu.level}
                                    </div>
                                    <h3 className="font-display text-xl md:text-2xl text-ink font-bold leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
                                        {edu.degree}
                                    </h3>
                                    <p className="font-sans text-sm text-dark-gray font-medium">
                                        {edu.institution}
                                    </p>
                                    <p className="font-mono text-xs text-mid-gray mt-2">
                                        {edu.duration}
                                    </p>
                                </div>

                                {/* Main Stat Highlight */}
                                <div className="flex bg-off-white p-4 items-center mb-8 border border-light-gray border-l-2 border-l-ink group-hover:bg-white transition-colors duration-300">
                                    <div className="flex-1">
                                        <div className="font-sans font-bold text-2xl text-ink">{edu.score}</div>
                                        <div className="font-mono text-[11px] text-mid-gray uppercase tracking-wider">{edu.highlight}</div>
                                    </div>
                                    <div className="bg-ink text-white font-mono text-[10px] uppercase px-2 py-1 flex items-center h-fit">
                                        {edu.badge}
                                    </div>
                                </div>

                                {/* Subjects List */}
                                <div className="mt-auto">
                                    <h4 className="font-mono text-xs uppercase text-mid-gray tracking-wider border-b border-light-gray pb-2 mb-4">Key Coursework</h4>
                                    <ul className="grid grid-cols-1 gap-y-2">
                                        {edu.subjects.map((sub, i) => (
                                            <li key={i} className="flex justify-between items-center text-sm font-sans text-dark-gray">
                                                <span>{sub.name}</span>
                                                <span className="font-mono text-[11px] bg-light-gray px-1.5 py-0.5 rounded text-ink">{sub.grade}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}
