"use client"

import React,{use} from 'react'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { useStore, Product } from '@/context/StoreContext'

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { products } = useStore()
    const { id } = use(params) // ✅ Unwrap Promise using React.use()

    const product = products.find((item: Product) => item._id.toString() === id)


    if (!product) {
        return (
            <div className="p-8 text-center text-red-500">
                Product not found.
            </div>
        )
    }

    return (
        <div className="mt-10 px-4">
            <CardContainer className="inter-var">
                <CardBody className="bg-white dark:bg-black border border-black/10 dark:border-white/20 rounded-2xl p-6 w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <CardItem translateZ="80" className="w-full">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={800}
                                height={800}
                                className="w-full h-[300px] sm:h-[400px] object-contain rounded-xl"
                            />
                        </CardItem>

                        <div className="space-y-3">
                            <CardItem translateZ="50" className="text-2xl font-bold text-neutral-800 dark:text-white">
                                {product.title}
                            </CardItem>

                            <CardItem translateZ="40" className="text-sm text-gray-500 dark:text-gray-400">
                                {product.category}
                            </CardItem>

                            <CardItem translateZ="50" className="text-xl font-semibold text-black dark:text-white">
                                ${product.price}
                            </CardItem>

                            <CardItem translateZ="30" className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                {product.description}
                            </CardItem>

                            <CardItem translateZ="20" className="text-sm text-gray-500 mt-2">
                                ⭐ {product.rating.rate} ({product.rating.count} reviews)
                            </CardItem>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
        </div>
    )
}
