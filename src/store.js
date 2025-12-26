import { create } from 'zustand'

export const useStore = create((set) => ({
    // Product State
    color: '#ffffff',
    setColor: (newColor) => set({ color: newColor }),

    // Auth State
    user: null, // { name: 'User', email: '...' }
    login: (userData) => set({ user: userData }),
    logout: () => set({ user: null }),

    // Cart State
    cartCount: 0,
    basePrice: 799,
    discountActive: false,

    addToCart: (qty) => set((state) => {
        const newCount = state.cartCount + qty
        // Activate 40% offer if 2 or more items
        const isOffer = newCount >= 2

        return {
            cartCount: newCount,
            discountActive: isOffer
        }
    }),

    removeFromCart: (qty) => set((state) => {
        const newCount = Math.max(0, state.cartCount - qty)
        const isOffer = newCount >= 2
        return {
            cartCount: newCount,
            discountActive: isOffer
        }
    })
}))
