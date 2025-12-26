'use client'

import { useState } from 'react'

export default function SizeSelector() {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const [selectedSize, setSelectedSize] = useState('M')
    const [hoveredSize, setHoveredSize] = useState(null)

    return (
        <div className="size-selector">
            <div style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 600
            }}>
                Select Size
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem',
                alignItems: 'center'
            }}>
                {sizes.map((size) => {
                    const isActive = selectedSize === size
                    const isHovered = hoveredSize === size

                    return (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            onMouseEnter={() => setHoveredSize(size)}
                            onMouseLeave={() => setHoveredSize(null)}
                            className="glass-panel"
                            style={{
                                width: '55px',
                                height: '45px',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8rem',
                                fontWeight: isActive ? 700 : 500,
                                border: isActive ? '2px solid white' : '1px solid var(--glass-border)',
                                background: isActive
                                    ? 'rgba(255, 255, 255, 0.15)'
                                    : isHovered
                                        ? 'rgba(255, 255, 255, 0.08)'
                                        : 'var(--glass-bg)',
                                transform: isActive ? 'scale(1.05)' : isHovered ? 'scale(1.02)' : 'scale(1)',
                                boxShadow: isActive
                                    ? '0 8px 24px rgba(255, 255, 255, 0.2)'
                                    : 'var(--glass-shadow)',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            {size}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
