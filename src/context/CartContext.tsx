"use client"
import {  createContext,useContext, useState, ReactNode, useEffect } from 'react'
import type { Product } from './StoreContext'


export interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (p: Product) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, delta: number) => void // +1 or -1
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be inside CartProvider')
    return ctx
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([])

    // Load cart from localStorage
    useEffect(() => {
        const cached = localStorage.getItem('cart')
        if (cached) setItems(JSON.parse(cached))
    }, [])

    // Persist cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addToCart = (p: Product) => {
        setItems(prev => {
            const exists = prev.find(i => i.id === p.id)
            if (exists) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i)
            return [...prev, { ...p, quantity: 1 }]
        })
    }

    const updateQuantity = (id: number, delta: number) => {
        setItems(prev => {
            return prev
                .map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
                .filter(i => i.quantity > 0)
        })
    }

    const removeFromCart = (id: number) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }

    const clearCart = () => setItems([])

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}