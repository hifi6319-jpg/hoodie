import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../store'
import { useCartStore } from '../store/cart'

export default function FooterData() {
    const [quantity, setQuantity] = useState(1)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const router = useRouter()

    const { color } = useStore() // Get selected color
    const addToCart = useCartStore(state => state.addToCart)
    const toggleCart = useCartStore(state => state.toggleCart)

    const basePrice = 799

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 480)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleIncrement = () => setQuantity(prev => Math.min(prev + 1, 10))
    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1))

    const getColorName = (c) => {
        if (c === '#ffffff') return 'Frost'
        if (c === '#8a2be2') return 'Void'
        return 'Crimson'
    }

    const getImageForColor = (c) => {
        // Placeholder logic - in real app would match actual image paths
        return '/images/placeholder-hoodie.png'
    }

    const handleAddToCart = () => {
        const colorName = getColorName(color)

        addToCart({
            id: 'hoodie-premium', // Single product for now
            name: 'Premium Casual Hoodie',
            price: basePrice,
            image: getImageForColor(color), // You might want to update this with real image logic
            color: color,
            colorName: colorName,
            size: 'M', // Defaulting to M as SizeSelector isn't fully linked yet in this context, or fetch from store if available
            quantity: quantity
        })

        setIsAddingToCart(true)
        setTimeout(() => {
            setIsAddingToCart(false)
            toggleCart() // Open cart after adding
        }, 800)
    }

    // Discount: 40% OFF when quantity >= 2
    const hasDiscount = quantity >= 2
    const discountedPrice = (basePrice * quantity * (hasDiscount ? 0.6 : 1)).toFixed(2)
    const originalPrice = (basePrice * quantity).toFixed(2)

    return (
        <div className="footer-data">
            {/* Discount Badge */}
            <div className="discount-container">
                {hasDiscount && (
                    <div className={`discount-badge ${isMobile ? 'mobile' : ''}`}>
                        🔥 40% OFF APPLIED
                    </div>
                )}
            </div>

            {/* Price Display */}
            <div className="glass-panel price-display">
                <div className="price-label">Total Price</div>
                <div className={`price-value ${hasDiscount ? 'discounted' : ''}`}>
                    <span className="current-price">₹{discountedPrice}</span>
                    {hasDiscount && <span className="original-price">₹{originalPrice}</span>}
                </div>
            </div>

            {/* Controls */}
            <div className="footer-controls">
                <button
                    className="glass-panel qty-btn"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity">
                    −
                </button>

                <div className="glass-panel qty-display">{quantity}</div>

                <button
                    className="glass-panel qty-btn"
                    onClick={handleIncrement}
                    disabled={quantity >= 10}
                    aria-label="Increase quantity">
                    +
                </button>

                <button
                    className={`premium-btn ${isAddingToCart ? 'adding' : ''}`}
                    onClick={handleAddToCart}>
                    {isAddingToCart ? '✓ Added' : 'Add to Cart'}
                </button>
            </div>

            {/* Legal Links */}
            <div className="footer-legal">
                <div className="legal-links">
                    <a href="/terms">Terms & Condition</a>
                    <a href="/shipping">Shipping</a>
                    <a href="/refund">Refund</a>
                </div>
                <div className="copyright">© 2025 All rights reserved.</div>
            </div>
        </div>
    )
}
