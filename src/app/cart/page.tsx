"use client"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useCart } from "@/context/CartContext"
import Link from "next/link"

const Page = () => {
    const { data: session } = useSession()
    const { cart, totalItems, clearCart, setCart } = useCart()

    const handleClearCart = async () => {
        await clearCart()
    }



    if (totalItems == 0) {
        return (
            <>

                <div className="w-full min-h-screen bg-gray-900 flex justify-center items-start pt-32">
                    <section className="p-8 flex flex-col justify-center items-center bg-gray-800 rounded-3xl shadow-lg w-3/4 h-96 md:w-1/2" aria-label="Empty cart message">
                        <p className="text-xl text-white mb-6">Your cart is empty.</p>
                        <Link
                            href="/home"
                            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                        >
                            🛍️ Shop Now
                        </Link>
                    </section>
                </div>
            </>
        )

    }


    const updateQuantity = async (productId: string) => {

        const res = await fetch(`/api/cart/${session?.user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        });

        const data = await res.json();

        if (res.ok) {
            setCart(data.cart);
        } else {
            alert(data.message);
        }
    };

    const decreaseQuantity = async (productId: string) => {
        const res = await fetch(`/api/cart/${session?.user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        });

        const data = await res.json();

        if (res.ok) {
            setCart(data.cart);
        } else {
            alert(data.message);
        }
    }

    const removeFromCart = async (productId: string) => {
        const res = await fetch(`/api/cart/${session?.user.id}/remove`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        });

        const data = await res.json();

        if (res.ok) {
            setCart(data.cart);
        } else {
            alert(data.message);
        }
    };


    return (
        <>


            <main className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16 px-4 ">

                <h1 className="text-3xl mt-20 font-semibold mb-8">Your Cart <span className="text-purple-300">({totalItems} itmes)</span> </h1>
                {
                    cart.map((item) => (

                        <section key={item.productId._id as string} className="w-full max-w-4xl bg-gray-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-lg m-10">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                                <Image
                                    src={item.productId.image}
                                    alt="product image"
                                    width={200}
                                    height={200}
                                    className="rounded-lg"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col flex-grow gap-4 ">
                                <h2 className="text-2xl font-medium">{item.productId.title}</h2>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 ">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center gap-2">
                                        <button onClick={()=>decreaseQuantity(item.productId._id as string)} className="w-8 h-8 flex items-center justify-center bg-purple-500 hover:bg-purple-600 rounded-full transition">
                                            <Image src="/minus.svg" alt="-" width={16} height={16} className="invert" />
                                        </button>

                                        <span className="text-lg font-semibold">{item.quantity} </span>

                                        <button onClick={()=>updateQuantity(item.productId._id as string)} className="w-8 h-8 flex items-center justify-center bg-purple-500 hover:bg-purple-600 rounded-full transition">
                                            <Image src="/plus.svg" alt="+" width={16} height={16} className="invert" />
                                        </button>
                                    </div>

                                    {/* delete section*/}
                                    <div onClick={()=>removeFromCart(item.productId._id as string)} className="relative cursor-pointer group">
                                        <Image src='/delete.svg' alt="delete" width={20} height={20} className="invert" />
                                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-red-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition">
                                            Delete
                                        </span>
                                    </div>


                                    {/* Price Info */}
                                    <div className="text-center sm:text-right">
                                        <p>Each: <strong>{item.productId.price}</strong></p>
                                        <p>Total: <strong>${(item.productId.price * item.quantity).toFixed(2)}</strong></p>
                                    </div>



                                </div>
                            </div>
                        </section>
                    ))
                }



                {/* Cart Actions */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <button onClick={()=>handleClearCart()} className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded transition">
                        Clear Cart
                    </button>

                    <p className="text-xl">
                        Grand Total: <strong>$ {cart
                            .reduce(
                                (total, item) => total + item.productId.price * item.quantity,
                                0
                            )
                            .toFixed(2)}</strong>
                    </p>

                    <button onClick={()=>{
                        alert("Comming Soon")
                    }} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition">
                        Proceed to Checkout
                    </button>
                </div>
            </main>
        </>
    )
}

export default Page
