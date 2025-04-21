"use client"

import Image from "next/image"
import { BackgroundGradient } from "./ui/background-gradient"
import { useRouter } from "next/navigation"
import {useStore} from "@/context/StoreContext"


interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: { rate: number; count: number }
}

const ProductPage = () => {
    const router = useRouter()
    const { products } = useStore()
    
    const handle = (productId: number) => {
        router.push(`/product/${productId}`)
    }

    return (
        <div className="py-12 bg-gray-900" id='#product'>
            <div>
                <div className="text-center">
                    <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Products </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Shop from Sogo</p>
                </div>
            </div>
            <div className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {products.map((product: Product) => (
                        <div key={product.id} className="flex justify-center cursor-pointer" onClick={() => handle(product.id)}>
                            <div>
                                <BackgroundGradient className="w-[320px] h-[500px] rounded-[22px] p-4 sm:p-6 bg-white dark:bg-zinc-900 flex flex-col justify-between">
                                    <Image
                                        src={product.image}
                                        alt="product image"
                                        height={200}
                                        width={200}
                                        className="object-contain mx-auto"
                                    />

                                    <div className="flex-1 mt-4">
                                        <p className="text-base sm:text-lg font-semibold text-black dark:text-neutral-200 mb-2 line-clamp-2">
                                            {product.title}
                                        </p>

                                    </div>

                                    <button className="rounded-full px-4 py-2 text-white flex items-center justify-between space-x-2 bg-black mt-4 text-xs font-bold dark:bg-zinc-800 mb-2">
                                        <span>Buy now</span>
                                        <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                            ${product.price}
                                        </span>
                                    </button>
                                </BackgroundGradient>
                            </div>


                        </div>

                    ))}
                </div>
            </div>



        </div>
    )
}

export default ProductPage
