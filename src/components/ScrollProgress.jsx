import { useState, useEffect } from 'react'

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setProgress(scroll * 100);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[10000] bg-transparent">
            <div
                className="h-full bg-accent origin-left transition-transform duration-100 ease-out"
                style={{ transform: `scaleX(${progress / 100})` }}
            />
        </div>
    )
}
