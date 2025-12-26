'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Background from '../../components/Background'

export default function About() {
    return (
        <main className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
                <Background />
            </div>
            <Navbar />

            <div className="page-content">
                <div className="glass-panel" style={{ maxWidth: '800px', width: '100%' }}>
                    <h1 style={{
                        fontSize: '4rem',
                        marginBottom: '2rem',
                        background: 'linear-gradient(135deg, #fff, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        About Us
                    </h1>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <p style={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            color: 'rgba(255,255,255,0.8)',
                            marginBottom: '2rem'
                        }}>
                            LUci represents the convergence of digital art and premium streetwear. Born from the void,
                            designed for the future. We believe in minimal aesthetics with maximum impact.
                        </p>
                        <p style={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            color: 'rgba(255,255,255,0.8)'
                        }}>
                            Each piece is crafted with ultra-matte materials, ensuring a sophisticated look that
                            transcends trends.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
