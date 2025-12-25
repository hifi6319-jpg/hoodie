import React from 'react'

export default function HeroContent() {
    return (
        <div className="hero-content">
            <h2 style={{
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                background: 'linear-gradient(to right, #a78bfa, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem'
            }}>Premium Casual Hoodies</h2>

            <h1 style={{
                fontSize: '4rem',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                fontWeight: 700
            }}>
                Wear Your Style <br />
                <span style={{ fontWeight: 300 }}>With Comfort.</span>
            </h1>

            <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                maxWidth: '400px'
            }}>
                Experience the fusion of luxury fabric science and modern streetwear aesthetics.
                Designed for the futuristic soul.
            </p>
        </div>
    )
}
