import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            isCartOpen: false,

            toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

            addToCart: (product) => {
                const { cart } = get()
                const existingItem = cart.find(item =>
                    item.id === product.id &&
                    item.color === product.color &&
                    item.size === product.size
                )

                if (existingItem) {
                    set({
                        cart: cart.map(item =>
                            (item.id === product.id && item.color === product.color && item.size === product.size)
                                ? { ...item, quantity: item.quantity + product.quantity }
                                : item
                        )
                    })
                } else {
                    set({ cart: [...cart, product] })
                }
            },

            removeFromCart: (itemId, color, size) => {
                set({
                    cart: get().cart.filter(item =>
                        !(item.id === itemId && item.color === color && item.size === size)
                    )
                })
            },

            updateQuantity: (itemId, color, size, quantity) => {
                if (quantity < 1) return
                set({
                    cart: get().cart.map(item =>
                        (item.id === itemId && item.color === color && item.size === size)
                            ? { ...item, quantity }
                            : item
                    )
                })
            },

            clearCart: () => set({ cart: [] }),

            getCartTotal: () => {
                const { cart } = get()
                return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
            },

            getCartCount: () => {
                const { cart } = get()
                return cart.reduce((count, item) => count + item.quantity, 0)
            }
        }),
        {
            name: 'hoodie-cart-storage',
        }
    )
)
