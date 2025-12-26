'use client'

import { useState } from 'react'
import { useStore } from '../store'

export default function Controls() {
    const colors = [
        { name: 'Frost', color: '#ffffff', label: 'Frost White' },
        { name: 'Void', color: '#8a2be2', label: 'Void Purple' },
        { name: 'Rose', color: '#f43f5e', label: 'Rose Red' }
    ]

    const { color: activeColor, setColor } = useStore()
    const [hoveredColor, setHoveredColor] = useState(null)

    const handleColorClick = (targetColor) => {
        const totalScroll = document.body.scrollHeight - window.innerHeight
        let targetScroll = 0

        if (targetColor === '#8a2be2') { // Void
            targetScroll = totalScroll * 0.33
        } else if (targetColor === '#f43f5e') { // Rose
            targetScroll = totalScroll * 0.66
        }

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        })
    }

    return (
        <div className="controls">
            <div style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.3em',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontWeight: 600
            }}>
                Color
            </div>

            {colors.map((c) => {
                const isActive = activeColor === c.color
                const isHovered = hoveredColor === c.name

                return (
                    <div key={c.name} style={{ position: 'relative' }}>
                        <button
                            className="glass-panel"
                            onClick={() => handleColorClick(c.color)}
                            onMouseEnter={() => setHoveredColor(c.name)}
                            onMouseLeave={() => setHoveredColor(null)}
                            style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '6px',
                                position: 'relative',
                                border: isActive ? '2px solid white' : '1px solid rgba(255,255,255,0.2)',
                                background: isActive
                                    ? 'rgba(255, 255, 255, 0.12)'
                                    : isHovered
                                        ? 'rgba(255, 255, 255, 0.08)'
                                        : 'var(--glass-bg)',
                                transform: isActive ? 'scale(1.1)' : isHovered ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: isActive
                                    ? `0 8px 24px ${c.color}40`
                                    : 'var(--glass-shadow)',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                cursor: 'pointer'
                            }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                backgroundColor: c.color,
                                boxShadow: `0 4px 16px ${c.color}60, 0 0 0 ${isActive ? '3px' : '0px'} ${c.color}40`,
                                transition: 'all 0.3s ease',
                                border: c.color === '#ffffff' ? '1px solid rgba(0,0,0,0.1)' : 'none'
                            }} />
                        </button>

                        {/* Tooltip on hover */}
                        {isHovered && (
                            <div style={{
                                position: 'absolute',
                                right: 'calc(100% + 1rem)',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                whiteSpace: 'nowrap',
                                fontSize: '0.85rem',
                                color: 'white',
                                background: 'rgba(0,0,0,0.8)',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontWeight: 500,
                                pointerEvents: 'none',
                                animation: 'fadeIn 0.2s ease'
                            }}>
                                {c.label}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
