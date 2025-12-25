'use client'

import { useLayoutEffect, useRef } from 'react'
import { useStore } from '../store'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Background() {
    const { color } = useStore()
    const bgRef = useRef()

    useLayoutEffect(() => {
        // Initial state
        gsap.set(bgRef.current, {
            background: 'radial-gradient(circle at center, #2a1b4e 0%, #000000 100%)'
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        })

        // Step 1: Transition to Blueish (Synced with Hoodie Blue)
        tl.to(bgRef.current, {
            background: 'radial-gradient(circle at center, #1e3a8a 0%, #000000 100%)',
            duration: 1,
            ease: 'none'
        })

        // Step 2: Transition to Redish (Synced with Hoodie Red)
        tl.to(bgRef.current, {
            background: 'radial-gradient(circle at center, #881337 0%, #000000 100%)',
            duration: 1,
            ease: 'none'
        })

    }, [])

    return (
        <div
            ref={bgRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    )
}
