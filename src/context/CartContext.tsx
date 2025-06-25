"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { ProductDocument } from "@/model/Product";
import { useRouter } from "next/navigation";

export interface CartItem {
    _id: string; // MongoDB ID for the cart item
    productId: ProductDocument; // Nested product details
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    totalItems: number;
    totalPrice: number; // Added for cart total price
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>; // Added for item removal
    updateQuantity: (productId: string, quantity: number) => Promise<void>; // Added for quantity updates
    refreshCart: () => Promise<void>;
    clearCart: () => Promise<void>;
    loading: boolean; // Added for UI feedback
    error: string | null; // Added for error feedback
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    // Memoize totalItems and totalPrice
    const { totalItems, totalPrice } = useMemo(() => {
        return cart.reduce(
            (acc, item) => ({
                totalItems: acc.totalItems + item.quantity,
                totalPrice:
                    acc.totalPrice + item.quantity * (item.productId.price || 0),
            }),
            { totalItems: 0, totalPrice: 0 }
        );
    }, [cart]);

    // Fetch cart when user is authenticated
    useEffect(() => {
        if (status !== "authenticated" || !session?.user?.id) return;

        const fetchCart = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/cart/${session.user.id}`, {
                    headers: { "Content-Type": "application/json" },
                    cache: "no-store", // Prevent caching for fresh data
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch cart: ${response.statusText}`);
                    setCart([])
                    return
                }
                const data = await response.json();
                setCart(Array.isArray(data.cart) ? data.cart : []);
            } catch (err) {
                console.error("Error fetching cart:", err);
                setError("Failed to load cart. Please try again.");
                setCart([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [session?.user?.id, status]);

    // Refresh cart data from server
    const refreshCart = async () => {
        if (status !== "authenticated" || !session?.user?.id) {
            setError("Please sign in to access your cart.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/cart/${session.user.id}`, {
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            });
            if (!response.ok) {
                throw new Error(`Failed to refresh cart: ${response.statusText}`);
            }
            const data = await response.json();
            setCart(Array.isArray(data.cart) ? data.cart : []);
        } catch (err) {
            console.error("Error refreshing cart:", err);
            setError("Failed to refresh cart. Please try again.");
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart
    const addToCart = async (productId: string, quantity: number = 1) => {
        if (status !== "authenticated" || !session?.user?.id) {
            setError("Please sign in to add items to your cart.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/cart/${session.user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                throw new Error(`Failed to add to cart: ${response.statusText}`);
            }
            await refreshCart();
        } catch (err) {
            console.error("Error adding to cart:", err);
            setError("Failed to add item to cart. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId: string) => {
        if (status !== "authenticated" || !session?.user?.id) {
            setError("Please sign in to remove items from your cart.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/cart/${session.user.id}/remove`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });
            if (!response.ok) {
                throw new Error(`Failed to remove from cart: ${response.statusText}`);
            }
            await refreshCart();
        } catch (err) {
            console.error("Error removing from cart:", err);
            setError("Failed to remove item from cart. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Update item quantity
    const updateQuantity = async (productId: string, quantity: number) => {
        if (status !== "authenticated" || !session?.user?.id) {
            setError("Please sign in to update cart items.");
            return;
        }
        if (quantity < 1) {
            await removeFromCart(productId); // Remove item if quantity is 0 or negative
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/cart/${session.user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update quantity: ${response.statusText}`);
            }
            await refreshCart();
        } catch (err) {
            console.error("Error updating quantity:", err);
            setError("Failed to update quantity. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Clear cart
    const clearCart = async () => {
        if (status !== "authenticated" || !session?.user?.id) {
            setError("Please sign in to clear your cart.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/cart/${session.user.id}/clearcart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error(`Failed to clear cart: ${response.statusText}`);
                alert(response)
            }

            setCart([]);
            console.log(response)
            router.push('/home')
        } catch (err) {
            console.error("Error clearing cart:", err);
            setError("Failed to clear cart. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                totalItems,
                totalPrice,
                addToCart,
                removeFromCart,
                updateQuantity,
                refreshCart,
                clearCart,
                loading,
                error,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};