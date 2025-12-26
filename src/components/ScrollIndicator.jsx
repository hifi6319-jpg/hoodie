'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollIndicator() {
    const indicatorRef = useRef()

    useEffect(() => {
        if (!indicatorRef.current) return

        // Bounce animation loop
        gsap.to(indicatorRef.current, {
            y: 8,
            duration: 0.8,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        })

        // Fade out on scroll
        gsap.to(indicatorRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'top -50',
                scrub: true,
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div
            ref={indicatorRef}
            className="scroll-indicator"
            style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 100,
                opacity: 1,
                pointerEvents: 'none'
            }}
        >
            <div style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
            }}>
                Scroll Down
            </div>
            <div style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.8)'
            }}>
                ↓
            </div>
        </div>
    )
}
