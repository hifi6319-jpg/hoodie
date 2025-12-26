'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen({ progress, isLoading }) {
    // Simplified rendering to avoid hydration mismatch and flash
    if (!isLoading) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(ellipse at center, #3b2667 0%, #1a0f2e 50%, #0a0514 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            opacity: isLoading ? 1 : 0,
            pointerEvents: isLoading ? 'all' : 'none',
            transition: 'opacity 0.5s ease-out'
        }}>
            {/* Brand Logo */}
            <div style={{
                fontSize: '3rem',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                marginBottom: '3rem',
                background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'pulse 2s ease-in-out infinite'
            }}>
                LUci.
            </div>

            {/* Loading Bar Container */}
            <div style={{
                width: '320px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Progress Bar */}
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #a78bfa, #f472b6)',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease-out',
                    boxShadow: '0 0 20px rgba(167, 139, 250, 0.6)'
                }} />
            </div>

            {/* Loading Percentage */}
            <div style={{
                marginTop: '2rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.2em',
                fontFamily: 'Outfit, sans-serif'
            }}>
                LOADING {Math.round(progress)}%
            </div>

            {/* Loading Subtitle */}
            <div style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.1em',
                fontFamily: 'Outfit, sans-serif'
            }}>
                Premium Collection
            </div>
        </div>
    )
}
