'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store/cart'
import { useRouter } from 'next/navigation'

export default function Cart() {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, getCartTotal } = useCartStore()
    const router = useRouter()

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 2000
                        }}
                    />

                    {/* Cart Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '100%',
                            maxWidth: '400px',
                            height: '100vh',
                            background: 'rgba(20, 20, 20, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderLeft: '1px solid rgba(255,255,255,0.1)',
                            zIndex: 2001,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Your Cart ({cart.length})</h2>
                            <button
                                onClick={toggleCart}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                                <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</span>
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.color}-${item.size}`} style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        marginBottom: '1rem',
                                        display: 'flex',
                                        gap: '1rem'
                                    }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            background: '#f0f0f0',
                                            borderRadius: '8px',
                                            backgroundImage: `url(${item.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }} />

                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                                                    style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.8rem' }}>
                                                {item.size} | {item.colorName}
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', padding: '0.2rem 0.5rem' }}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                                                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{ fontSize: '0.9rem' }}>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                                                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div style={{ fontWeight: 600 }}>
                                                    ₹{item.price * item.quantity}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 700 }}>
                                <span>Total</span>
                                <span>₹{getCartTotal().toFixed(2)}</span>
                            </div>

                            <button
                                disabled={cart.length === 0}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: cart.length > 0 ? 'white' : 'rgba(255,255,255,0.2)',
                                    color: 'black',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
                                    opacity: cart.length > 0 ? 1 : 0.7
                                }}
                            >
                                Checkout
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
