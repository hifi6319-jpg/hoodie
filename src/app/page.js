'use client'

import Background from '../components/Background'
import Scene from '../components/canvas/Scene'
import Navbar from '../components/Navbar'
import HeroContent from '../components/HeroContent'
import Controls from '../components/Controls'
import FooterData from '../components/FooterData'
import ScrollProgress from '../components/ScrollProgress'
import SizeSelector from '../components/SizeSelector'
import ProductSpecs from '../components/ProductSpecs'
import Cart from '../components/Cart'
import LoadingScreen from '../components/LoadingScreen'
import ScrollIndicator from '../components/ScrollIndicator'

import { useState, useEffect } from 'react'

export default function Home() {
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    // Ensure page starts from top on load/reload
    useEffect(() => {
        window.scrollTo(0, 0)

        // Disable scroll during loading
        if (isLoading) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            // Enable scroll after loading for GSAP animations
            document.body.style.overflow = 'auto'
            document.documentElement.style.overflow = 'auto'
        }

        // Also handle browser back/forward navigation
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        return () => {
            document.body.style.overflow = 'auto'
            document.documentElement.style.overflow = 'auto'
        }
    }, [isLoading])

    // Simulate loading progress
    useEffect(() => {
        let progress = 0
        const interval = setInterval(() => {
            progress += Math.random() * 15
            if (progress >= 100) {
                progress = 100
                clearInterval(interval)
                // Small delay before hiding loader
                setTimeout(() => {
                    setIsLoading(false)
                }, 300)
            }
            setLoadingProgress(progress)
        }, 200)

        return () => clearInterval(interval)
    }, [])

    const handleLoadingComplete = () => {
        setLoadingProgress(100)
        setTimeout(() => {
            setIsLoading(false)
            // Refresh ScrollTrigger to ensure start/end positions are correct after loading screen removal
            import('gsap/ScrollTrigger').then((mod) => {
                setTimeout(() => mod.ScrollTrigger.refresh(), 100)
            })
        }, 300)
    }

    return (
        <>
            <LoadingScreen progress={loadingProgress} isLoading={isLoading} />

            <main id="scroll-container" className="app-container" style={{ position: 'relative', minHeight: '500vh' }}>
                {/* Fixed content container */}
                <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
                    <Background />
                    <Scene onLoadingComplete={handleLoadingComplete} />
                    <Navbar />
                    <HeroContent />
                    <Controls />
                    <SizeSelector />
                    <ProductSpecs />
                    <Cart />
                    <ScrollIndicator />
                    <FooterData />
                </div>
            </main>
        </>
    );
}
