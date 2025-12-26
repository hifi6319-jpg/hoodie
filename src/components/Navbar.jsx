import React, { useState, useEffect } from 'react'
import { useCartStore } from '../store/cart'
import { useStore } from '../store'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleCart = useCartStore(state => state.toggleCart)
    const getCartCount = useCartStore(state => state.getCartCount)
    const { user, logout } = useStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
        setIsOpen(false)
    }

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    return (
        <nav className="navbar">
            <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em', zIndex: 201, position: 'relative' }}>LUci.</div>

            {/* Desktop Nav */}
            <div className="glass-panel nav-links">
                <a href="/" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500 }}>Home</a>
                <a href="/collection" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500 }}>Collection</a>
                <a href="/about" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500 }}>About</a>
                <a href="/contact" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500 }}>Contact</a>
                {user ? (
                    <a href="#" onClick={handleLogout} style={{ textDecoration: 'none', color: '#ff4d4d', fontSize: '0.9rem', fontWeight: 500 }}>Logout</a>
                ) : (
                    <a href="/auth" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500 }}>Login</a>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 201 }}>
                <button
                    onClick={toggleCart}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}
                    aria-label="Cart"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {mounted && getCartCount() > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            background: '#ff4d4d',
                            color: 'white',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {getCartCount()}
                        </span>
                    )}
                </button>

                {/* Mobile Hamburger */}
                <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
                    <span className={`line ${isOpen ? 'open' : ''}`}></span>
                    <span className={`line ${isOpen ? 'open' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div className="mobile-nav-links">
                    <a href="/" onClick={() => setIsOpen(false)} style={{ animationDelay: '0.1s', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }}>Home</a>
                    <a href="/collection" onClick={() => setIsOpen(false)} style={{ animationDelay: '0.2s', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }}>Collection</a>
                    <a href="/about" onClick={() => setIsOpen(false)} style={{ animationDelay: '0.3s', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }}>About</a>
                    <a href="/contact" onClick={() => setIsOpen(false)} style={{ animationDelay: '0.4s', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }}>Contact</a>
                    {user ? (
                        <a href="#" onClick={handleLogout} style={{ animationDelay: '0.5s', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)', color: '#ff4d4d' }}>Logout</a>
                    ) : (
                        <a href="/auth" onClick={() => setIsOpen(false)} style={{ animationDelay: '0.5s', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }}>Login</a>
                    )}
                </div>
            </div>
        </nav>
    )
}
