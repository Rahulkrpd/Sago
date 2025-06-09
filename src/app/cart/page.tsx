"use client"
import Image from 'next/image'

import { useCart } from '@/context/CartContext'
import Navbar from '@/components/Navbar'

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart()

    if (items.length === 0) {
        return <div className="p-8 text-center">Your cart is empty.</div>
    }

    return (
        <>
            <Navbar />
            <div className="p-8 max-w-4xl mx-auto mt-40">
                <h1 className="text-2xl font-bold mb-4">Your Cart ({totalItems} items)</h1>

                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 border p-4 rounded">
                            <Image src={item.image} alt={item.title} width={20} height={20} className="w-20 h-20 object-contain " />
                            <div className="flex-1">
                                <h2 className="font-semibold">{item.title}</h2>
                                <p>${item.price.toFixed(2)} each</p>
                                <div className="mt-2 flex items-center space-x-2">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded text-blue-700">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, +1)} className="px-2 py-1 bg-gray-200 rounded text-red-800">+</button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline mt-2">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <button onClick={clearCart} className="text-red-600 hover:underline">Clear Cart</button>
                    <div className="text-xl font-bold">Grand Total: ${totalPrice.toFixed(2)}</div>
                    <button
                        onClick={() => alert('Proceeding to checkout')}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </>
    )
}
