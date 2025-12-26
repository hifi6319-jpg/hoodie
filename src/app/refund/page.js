'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Background from '../../components/Background'

export default function Refund() {
    return (
        <main className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
                <Background />
            </div>
            <Navbar />

            <div className="glass-panel" style={{
                margin: '150px auto 50px',
                width: '80%',
                maxWidth: '800px',
                padding: '4rem',
                minHeight: '60vh',
                position: 'relative',
                zIndex: 10
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Refund Policy
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                    30-day return policy for unworn items in original packaging. Contact support for return authorization.
                </p>
            </div>
        </main>
    )
}
