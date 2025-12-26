'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Background from '../../components/Background'

export default function Contact() {
    return (
        <main className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
                <Background />
            </div>
            <Navbar />

            <div className="page-content">
                <div className="glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
                    <h1 style={{
                        fontSize: '4rem',
                        marginBottom: '2rem',
                        background: 'linear-gradient(135deg, #fff, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Contact
                    </h1>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                        <input
                            type="text"
                            placeholder="Name"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '1rem',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '1rem',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                        <textarea
                            placeholder="Message"
                            rows="5"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '1rem',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '1rem',
                                fontFamily: 'inherit'
                            }}
                        />
                        <button className="premium-btn" type="button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
