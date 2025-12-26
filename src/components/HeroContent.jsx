import React from 'react'

export default function HeroContent() {
    return (
        <div className="hero-content">
            <h2 style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.4em',
                background: 'linear-gradient(to right, #a78bfa, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                fontWeight: 600
            }}>Premium Casual Collection</h2>

            <h1 style={{
                fontSize: '4.5rem',
                lineHeight: 1,
                marginBottom: '2rem',
                fontWeight: 800,
                letterSpacing: '-0.02em'
            }}>
                Wear Your Style <br />
                <span style={{ fontWeight: 300, italic: 'true', opacity: 0.9 }}>With Comfort.</span>
            </h1>

            <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '1.2rem',
                lineHeight: 1.7,
                maxWidth: '430px',
                fontWeight: 400
            }}>
                Experience the fusion of luxury fabric science and modern streetwear aesthetics.
                Designed for the digital-native generation.
            </p>
        </div>
    )
}
