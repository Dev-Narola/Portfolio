import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import PageTransition from '../components/PageTransition'
import { useThree } from '../hooks/useThree'
import createContactScene from '../three/ContactScene'

export default function Contact() {
    const mountRef = useRef(null)
    const formRef = useRef(null)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

    // Store the scene instance to trigger explosion later
    const sceneRef = useRef(null)

    // Initialize Three.js Magnetic Particles Scene
    useThree(mountRef, (scene, camera, renderer) => {
        const instance = createContactScene(scene, camera, renderer)
        sceneRef.current = instance
        return instance
    })

    const copyToClipboard = () => {
        navigator.clipboard.writeText('ds.narola2004@gmail.com')
        // Optional: add a tiny toast notification here
    }

    const sendEmail = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        // In dev or if env vars are missing, just simulate success for demo purposes
        if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) {
            setTimeout(() => {
                setIsSubmitting(false)
                setSubmitStatus('success')
                formRef.current.reset()
                if (sceneRef.current?.triggerExplosion) {
                    sceneRef.current.triggerExplosion()
                }
            }, 1500)
            return
        }

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )

            setSubmitStatus('success')
            formRef.current.reset()

            // Trigger Three.js particle burst!
            if (sceneRef.current?.triggerExplosion) {
                sceneRef.current.triggerExplosion()
            }

        } catch (error) {
            console.error('EmailJS Error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <PageTransition>
            <section className="contact-section relative w-full min-h-screen bg-white overflow-hidden py-32 px-6 md:px-12 flex flex-col items-center justify-center">

                {/* Three.js Background Canvas */}
                <div
                    ref={mountRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                />

                <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

                    {/* Left Side: Contact Details */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink font-bold leading-none mb-8 md:mb-12 tracking-tighter mix-blend-difference pointer-events-none">
                            LET'S BUILD<br />SOMETHING.
                        </h1>

                        <div className="space-y-6 font-sans text-dark-gray text-lg tracking-wide">

                            <div className="flex items-center gap-4 group w-fit cursor-pointer" onClick={copyToClipboard} data-cursor="hover">
                                <span className="group-hover:text-accent transition-colors duration-300">ds.narola2004@gmail.com</span>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-mid-gray px-2 py-0.5 border border-light-gray group-hover:border-accent group-hover:text-accent transition-all duration-300 rounded-sm">Copy</span>
                            </div>

                            <div>
                                <a href="tel:+918488002600" className="hover:text-accent transition-colors duration-300" data-cursor="hover">+91 8488002600</a>
                            </div>
                            <div>Surat, Gujarat, India</div>

                            <div className="flex items-center gap-6 pt-8 font-mono text-xs uppercase tracking-widest">
                                <a href="https://linkedin.com/in/devnarola" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent border-b border-transparent hover:border-accent pb-0.5 transition-all duration-300" data-cursor="hover">LinkedIn ↗</a>
                                <a href="https://github.com/Dev-Narola" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent border-b border-transparent hover:border-accent pb-0.5 transition-all duration-300" data-cursor="hover">GitHub ↗</a>
                                <a href="/Dev-Narola-Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent border-b border-ink hover:border-accent pb-0.5 transition-all duration-300" data-cursor="hover">Resume ↓</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="flex-1 w-full bg-white/80 backdrop-blur-md p-6 md:p-8 border border-light-gray">
                        <h3 className="font-mono text-sm tracking-widest text-mid-gray uppercase mb-8">
              // Or just send a message
                        </h3>

                        <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-6">

                            <div className="relative group">
                                <input
                                    type="text"
                                    name="from_name"
                                    id="name"
                                    required
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-light-gray py-2 text-ink font-sans focus:outline-none focus:border-ink transition-colors duration-300"
                                    data-cursor="hover"
                                />
                                <label htmlFor="name" className="absolute left-0 top-2 text-mid-gray font-sans text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ink peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-mono peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest peer-valid:font-mono pointer-events-none">
                                    Name
                                </label>
                            </div>

                            <div className="relative group">
                                <input
                                    type="email"
                                    name="from_email"
                                    id="email"
                                    required
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-light-gray py-2 text-ink font-sans focus:outline-none focus:border-ink transition-colors duration-300"
                                    data-cursor="hover"
                                />
                                <label htmlFor="email" className="absolute left-0 top-2 text-mid-gray font-sans text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ink peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-mono peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest peer-valid:font-mono pointer-events-none">
                                    Email
                                </label>
                            </div>

                            <div className="relative group mt-2">
                                <textarea
                                    name="message"
                                    id="message"
                                    required
                                    rows="4"
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-light-gray py-2 text-ink font-sans resize-none focus:outline-none focus:border-ink transition-colors duration-300"
                                    data-cursor="hover"
                                ></textarea>
                                <label htmlFor="message" className="absolute left-0 top-2 text-mid-gray font-sans text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ink peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-mono peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest peer-valid:font-mono pointer-events-none">
                                    Message
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full py-4 mt-4 bg-ink text-white font-mono text-sm uppercase tracking-widest overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                data-cursor="hover"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent Successfully ✓' : 'Send Message →'}
                                </span>
                                {!isSubmitting && submitStatus !== 'success' && (
                                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                                )}
                            </button>

                            {submitStatus === 'error' && (
                                <p className="text-red-500 font-sans text-xs text-center mt-2">
                                    Failed to send message. Please try again or email directly.
                                </p>
                            )}
                        </form>
                    </div>

                </div>
            </section>
        </PageTransition>
    )
}
