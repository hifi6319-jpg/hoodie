import { create } from 'zustand'

export const useStore = create((set) => ({
    color: '#8a2be2', // Default Void color
    setColor: (newColor) => set({ color: newColor }),
}))
