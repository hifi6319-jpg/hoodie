'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Background from '../../components/Background'

export default function Collection() {
    return (
        <main className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
                <Background />
            </div>
            <Navbar />

            <div className="page-content">
                <div className="glass-panel" style={{ width: '100%', maxWidth: '1200px' }}>
                    <h1 style={{
                        fontSize: '4rem',
                        marginBottom: '2rem',
                        background: 'linear-gradient(135deg, #fff, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Collection
                    </h1>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        width: '100%',
                        padding: '1rem 0'
                    }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.05)',
                                height: '400px',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255,255,255,0.1)',
                                transition: 'all 0.3s ease'
                            }}>
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }}>Coming Soon</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
