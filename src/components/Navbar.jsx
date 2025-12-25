import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>LUci.</div>

            <div className="glass-panel nav-links">
                {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                    <a key={item} href="#" style={{
                        textDecoration: 'none',
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '0.9rem',
                        fontWeight: 500
                    }}>{item}</a>
                ))}
            </div>

            <div style={{ width: '40px' }}>{/* Spacer or Search */}</div>
        </nav>
    )
}
