'use client';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { ProductDocument } from '@/model/Product';

export interface CartItem extends ProductDocument {
    _id: string; // MongoDB ID for the cart item
    productId: ProductDocument; // Nested product details
    quantity: number;
}

type CartContextType = {
    cart: CartItem[];
    totalItems: number;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    refreshCart: () => Promise<void>;
    clearCart: (userId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [cart, setCart] = useState<CartItem[]>([]);

    // Memoize totalItems to avoid recalculating on every render
    const totalItems = useMemo(
        () => cart.reduce((acc, item) => acc + item.quantity, 0),
        [cart]
    );

    // Fetch cart when user is logged in
    useEffect(() => {
        if (!session?.user.id) return;

        const fetchCart = async () => {
            try {
                const response = await fetch(`/api/cart/${session.user.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart');
                }
                const data = await response.json();
                setCart(data.cart || []);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, [session?.user.id]);

    // Refresh cart data from server
    const refreshCart = async () => {
        if (!session?.user.id) return;
        try {
            const response = await fetch(`/api/cart/${session.user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            setCart(data.cart || []);
        } catch (error) {
            console.error('Error refreshing cart:', error);
        }
    };

    // Add item to cart and refresh
    const addToCart = async (productId: string, quantity: number = 1) => {
        if (!session?.user.id) return;
        try {
            const response = await fetch(`/api/cart/${session.user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            await refreshCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Clear cart and update state
    const clearCart = async (userId: string) => {
        try {
            const response = await fetch(`/api/cart/${userId}/clearcart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }
            const data = await response.json();
            setCart(data.cart);
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ cart, totalItems, addToCart, refreshCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};