// src/context/CartContext.tsx
'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { ProductDocumnet } from '@/model/Product'

export interface CartItem extends ProductDocumnet {

    _id: string; // MongoDB ID for the cart item
    productId: ProductDocumnet; // Nested product details
    quantity: number;
}

type CartContextType = {
    cart: CartItem[]
    totalItems: number
    addToCart: (productId: string, quantity?: number) => void
    refreshCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()
    const [cart, setCart] = useState<CartItem[]>([])

    const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;



    const refreshCart = useCallback(async () => {
        if (!session?.user?.id) return
        const res = await fetch(`/api/cart/${session.user.id}/get`)
        const data = await res.json()
        setCart(data.cart)
    }, [session?.user?.id])

    const addToCart = async (productId: string, quantity: number = 1) => {
        if (!session?.user?.id) return
        await fetch(`/api/cart/${session.user.id}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity })
        })
        refreshCart()
    }

    useEffect(() => {
        if (session?.user?.id) {
            refreshCart()
        }
    }, [session?.user?.id, refreshCart])

    return (
        <CartContext.Provider value={{ cart, totalItems, addToCart, refreshCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used inside CartProvider')
    return context
}
