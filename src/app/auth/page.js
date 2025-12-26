'use client'

import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Background from '../../components/Background'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const { login } = useStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Simulate Auth for demo smoothness (Integration with real DB would happen via API routes here)
        console.log("Authenticating:", email)

        // Mock successful login
        login({ email, name: email.split('@')[0] })

        // Redirect back to home to complete purchase
        router.push('/')
    }

    return (
        <main className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
                <Background />
            </div>
            <Navbar />

            <div className="glass-panel page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '2rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                        marginBottom: '2rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #fff, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {isLogin ? 'Welcome Back' : 'Join the Void'}
                    </h1>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontSize: '1rem'
                                }}
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '1rem',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />

                        <button type="submit" className="premium-btn" style={{ width: '100%', marginTop: '1rem' }}>
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                background: 'none',
                                color: '#a78bfa',
                                border: 'none',
                                padding: 0,
                                textDecoration: 'underline',
                                fontSize: 'inherit',
                                fontWeight: 600
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
