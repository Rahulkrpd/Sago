"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";


export default function CartPage() {
    const { cart, totalItems, clearCart } = useCart();


    const handleClearCart = async () => {

        await clearCart()
    };

    if (totalItems === 0) {

        return (

            <div className="w-full min-h-screen  flex justify-center items-center">
                <section className="p-8 text-center" aria-label="Empty cart message">
                    <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
                    <Link
                        href="/home"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Shop Now
                    </Link>
                </section>
            </div>)
    }



    const updateQuantity = () => {
        // Implement logic
    };

    const removeFromCart = () => {
        // Implement logic
    };



    return (
        <>
            <Navbar />
            <div className="p-8 max-w-4xl mx-auto mt-40">
                <h1 className="text-2xl font-bold mb-4">Your Cart ({totalItems} items)</h1>

                <div className="space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item._id} // Use item._id instead of item.id
                            className="flex items-center space-x-4 border p-4 rounded"
                        >
                            {item.productId.image ? (
                                <Image
                                    src={item.productId.image}
                                    alt={item.productId.title}
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 object-contain"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                                    No Image
                                </div>
                            )}
                            <div className="flex-1">
                                <h2 className="font-semibold">{item.productId.title}</h2>
                                <p>${item.productId.price} each</p>
                                <div className="mt-2 flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity()} // Use item._id
                                        className="px-2 py-1 bg-gray-200 rounded text-blue-700"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity()} // Use item._id
                                        className="px-2 py-1 bg-gray-200 rounded text-red-800"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">
                                    Total: ${(item.productId.price * item.quantity).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => removeFromCart()} // Use item._id
                                    className="text-red-600 hover:underline mt-2"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <button onClick={() => handleClearCart()} className="text-red-600 hover:underline">
                        Clear Cart
                    </button>
                    <div className="text-xl font-bold">
                        Grand Total: $
                        {cart
                            .reduce(
                                (total, item) => total + item.productId.price * item.quantity,
                                0
                            )
                            .toFixed(2)}
                    </div>
                    <button
                        onClick={() => alert("Proceeding to checkout")}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </>
    );
}