import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PageTransition from '../components/PageTransition'
import { skills } from '../data/skills'
import { useThree } from '../hooks/useThree'
import createAboutBackgroundScene from '../three/AboutBackgroundScene'

export default function Skills() {
    const bgMountRef = useRef(null)

    // Initialize Animated Interactive Background
    useThree(bgMountRef, createAboutBackgroundScene)

    // GSAP Scroll Animations
    useEffect(() => {
        // Categories Reveal
        gsap.fromTo('.skill-category',
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.skills-section',
                    start: 'top 75%',
                }
            }
        )

        // Icons Stagger Reveal inside each category
        const categories = document.querySelectorAll('.skill-category')
        categories.forEach((category) => {
            gsap.fromTo(category.querySelectorAll('.skill-item'),
                { scale: 0.5, opacity: 0, rotationY: -90 },
                {
                    scale: 1, opacity: 1, rotationY: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: category,
                        start: 'top 85%',
                    }
                }
            )
        })
    }, [])

    return (
        <PageTransition>
            <section className="skills-section relative w-full min-h-screen py-32 px-6 md:px-12 bg-white overflow-hidden">

                {/* Three.js Interactive Background Canvas */}
                <div
                    ref={bgMountRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ opacity: 0.6 }}
                />

                <div className="relative z-10 w-full max-w-[1440px] mx-auto">
                    <h2 className="font-mono text-sm tracking-widest text-mid-gray uppercase mb-16 text-center">
                        // Technical Arsenal
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">

                        {Object.entries(skills).map(([key, categorySkills], index) => {
                            // Format key to string: databases_cloud -> Databases & Cloud
                            const title = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' & ')

                            return (
                                <div key={index} className="skill-category flex flex-col items-center bg-off-white p-8 border border-light-gray group hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-ink transition-all duration-500">
                                    <h3 className="font-display text-2xl text-ink font-bold leading-tight mb-8">
                                        {title === 'Ai & Ml' ? 'AI & ML' : title}
                                    </h3>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
                                        {categorySkills.map((skill, i) => (
                                            <div
                                                key={i}
                                                className="skill-item flex flex-col items-center justify-center gap-3 w-full group/icon perspective-1000"
                                                data-cursor="hover"
                                            >
                                                <div className="w-16 h-16 bg-white border border-light-gray rounded-xl flex items-center justify-center p-3 shadow-sm transform transition-all duration-500 group-hover/icon:-translate-y-2 group-hover/icon:shadow-md group-hover/icon:border-ink" style={{ transformStyle: 'preserve-3d' }}>
                                                    <img
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        className="w-full h-full object-contain filter grayscale group-hover/icon:grayscale-0 transition-all duration-500"
                                                    />
                                                </div>
                                                <span className="font-mono text-[11px] text-mid-gray uppercase tracking-wider group-hover/icon:text-ink transition-colors duration-300 text-center">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </section>
        </PageTransition>
    )
}
