'use client'

import { useLayoutEffect, useRef } from 'react'
import { useStore } from '../store'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Background() {
    const { color, setColor } = useStore()
    const bgRef = useRef()

    useLayoutEffect(() => {
        if (!bgRef.current) return

        // Initial state - Slate/Gray gradient for Frost White
        // Using a dark but cool tone to make the white hoodie pop
        gsap.set(bgRef.current, {
            background: 'radial-gradient(ellipse 80% 60% at center 30%, #475569 0%, #334155 30%, #1e293b 60%, #0f172a 100%)'
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                invalidateOnRefresh: true,
            }
        })

        // Sync Store - Frost at Start
        tl.call(() => setColor('#ffffff'), null, 0)

        // Snap to Purple (Void) at 33%
        tl.to(bgRef.current, {
            background: 'radial-gradient(ellipse 80% 60% at center 30%, #7C3AED 0%, #5B21B6 30%, #4C1D95 60%, #1a0f28 100%)',
            duration: 0.1,
            ease: 'none'
        }, 0.33)
        tl.call(() => setColor('#8a2be2'), null, 0.33)

        // Snap to Rose Red at 66% (Crimson)
        tl.to(bgRef.current, {
            background: 'radial-gradient(ellipse 80% 60% at center 30%, #BE123C 0%, #9F1239 30%, #881337 60%, #1a0814 100%)',
            duration: 0.1,
            ease: 'none'
        }, 0.66)
        tl.call(() => setColor('#f43f5e'), null, 0.66)

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div
            ref={bgRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(ellipse 80% 60% at center 30%, #475569 0%, #334155 30%, #1e293b 60%, #0f172a 100%)',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    )
}
