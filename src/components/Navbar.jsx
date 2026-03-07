import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

    const location = useLocation()
    const isHero = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Handle visibility (hide on scroll down, show on up)
            if (currentScrollY > 100) {
                setIsScrolled(true)
                if (currentScrollY > lastScrollY) {
                    setIsVisible(false) // scrolling down
                } else {
                    setIsVisible(true) // scrolling up
                }
            } else {
                setIsScrolled(false)
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        // Only attach if menu is not open
        if (!isMobileMenuOpen) {
            window.addEventListener('scroll', handleScroll, { passive: true })
        }

        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY, isMobileMenuOpen])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
        window.scrollTo(0, 0)
    }, [location.pathname])

    const navLinks = [
        { name: 'About', path: '/about' },
        { name: 'Skills', path: '/skills' },
        { name: 'Work', path: '/work' },
        { name: 'Experience', path: '/experience' },
        { name: 'Education', path: '/education' },
        { name: 'Contact', path: '/contact' }
    ]

    const navClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out h-16
    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    ${isScrolled || !isHero ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]' : 'bg-transparent'}
  `

    return (
        <>
            <nav className={navClasses}>
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="font-display font-bold text-xl tracking-tight text-ink"
                        data-cursor="hover"
                    >
                        DN
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    data-cursor="hover"
                                    className={`
                    text-sm font-medium relative py-2
                    ${isActive ? 'text-ink' : 'text-mid-gray hover:text-ink'}
                    transition-colors duration-200
                  `}
                                >
                                    {link.name}
                                    {/* Underline for active state */}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-ink transform origin-left transition-transform duration-300 ease-out scale-x-100" />
                                    )}
                                    {/* Hover underline */}
                                    {!isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-ink transform origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100 opacity-50" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden z-50 p-2 -mr-2 text-ink flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-current transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`
          fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
            >
                <div className="flex flex-col space-y-8 items-center text-center">
                    <Link to="/" className="font-display text-4xl mb-4" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="font-display text-4xl text-ink relative overflow-hidden group"
                            style={{
                                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                opacity: isMobileMenuOpen ? 1 : 0,
                                transition: `transform 500ms cubic-bezier(0.16,1,0.3,1) ${100 + index * 50}ms, opacity 500ms ease ${100 + index * 50}ms`
                            }}
                        >
                            <span className={`inline-block ${location.pathname === link.path ? 'border-b-2 border-ink' : ''}`}>
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
