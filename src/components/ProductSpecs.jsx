'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'

export default function ProductSpecs() {
    const { color } = useStore()
    const [isOpen, setIsOpen] = useState(false)

    const getMaterialName = () => {
        if (color === '#ffffff') return 'Frost Cotton'
        if (color === '#8a2be2') return 'Void Velvet'
        return 'Rose Fleece'
    }

    const specs = [
        { label: 'Material', value: getMaterialName() },
        { label: 'Weight', value: '420gsm' },
        { label: 'Fit', value: 'Relaxed' },
        { label: 'Origin', value: 'Premium EU' }
    ]

    return (
        <motion.div
            className="glass-panel product-specs"
            layout
            onClick={() => setIsOpen(!isOpen)}
            style={{
                borderRadius: '20px',
                cursor: 'pointer',
                overflow: 'hidden'
            }}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
        >
            <motion.div
                layout="position"
                style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                Specifications
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    style={{ fontSize: '1.2rem', display: 'block' }}
                    className="mobile-indicator"
                >
                    ↓
                </motion.span>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginTop: '1.2rem' }}
                    >
                        {specs.map((spec, idx) => (
                            <div
                                key={spec.label}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: idx < specs.length - 1 ? '0.9rem' : 0,
                                    fontSize: '0.95rem'
                                }}
                            >
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
                                    {spec.label}
                                </span>
                                <span style={{ fontWeight: 600, color: '#ffffff' }}>
                                    {spec.value}
                                </span>
                            </div>
                        ))}

                        {/* Premium Badge */}
                        <div style={{
                            marginTop: '1.5rem',
                            paddingTop: '1.2rem',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
                                boxShadow: '0 0 10px rgba(167, 139, 250, 0.6)'
                            }} />
                            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                                Premium Collection
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
