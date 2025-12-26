'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Vertical Progress Bar */}
            <div style={{
                position: 'fixed',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '200px',
                width: '2px',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 200,
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: '100%',
                    height: `${scrollProgress}%`,
                    background: 'linear-gradient(to bottom, #a78bfa, #f472b6)',
                    transition: 'height 0.1s ease-out',
                    boxShadow: '0 0 10px rgba(167, 139, 250, 0.5)'
                }} />
            </div>

            {/* Scroll Indicator Text */}
            <div style={{
                position: 'fixed',
                left: '2rem',
                bottom: '2rem',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                zIndex: 200,
                fontWeight: 600
            }}>
                {scrollProgress < 30 ? 'FROST' : scrollProgress < 70 ? 'VOID' : 'ROSE'}
            </div>
        </>
    )
}
