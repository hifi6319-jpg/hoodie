'use client'

import React from 'react'
import { useStore } from '../store'

export default function Controls() {
    const colors = [
        { name: 'Void', color: '#8a2be2' },
        { name: 'Azure', color: '#3b82f6' },
        { name: 'Rose', color: '#f43f5e' }
    ]

    const { color: activeColor, setColor } = useStore()

    return (
        <div className="controls">
            {colors.map((c) => {
                const isActive = activeColor === c.color
                return (
                    <button key={c.name} className="glass-panel"
                        onClick={() => setColor(c.color)}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            position: 'relative',
                            border: isActive ? '2px solid white' : '1px solid var(--glass-border)',
                            transform: isActive ? 'scale(1.1)' : 'scale(1)'
                        }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: c.color,
                            boxShadow: `0 0 10px ${c.color}`
                        }} />
                    </button>
                )
            })}

        </div>
    )
}
