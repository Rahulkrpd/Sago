import React from 'react'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Product } from "@/context/StoreContext"


interface ProductPageProps {
    params: {
        id: string
    }
}

async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!res.ok) return null
        return res.json()
    } catch (error) {
        return null
    }
}

export default async function ProductDetials({ params }: ProductPageProps) {

    const product = await getProduct(params.id)

    if (!product) {
        return (
            <>
                product not found
            </>
        )
    }

    return (
        <div className="mt-10 px-4">
            <CardContainer className="inter-var">
                <CardBody className="bg-white dark:bg-black border border-black/10 dark:border-white/20 rounded-2xl p-6 w-full max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Product Image */}
                        <CardItem translateZ="80" className="w-full">
                            <Image
                                src={product.image}
                                alt="test"
                                width={800}
                                height={800}
                                className="w-full h-[300px] sm:h-[400px] object-contain rounded-xl"
                            />
                        </CardItem>

                        {/* Product Details */}
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
                                {
                                    product.description
                                } </CardItem>

                            <CardItem translateZ="20" className="text-sm text-gray-500 mt-2">
                                ⭐ {product.rating.rate} ({product.rating.count}reviews)
                            </CardItem>
                        </div>
                    </div>

                    {/* Action Buttons */}

                </CardBody>
            </CardContainer>
        </div>
    )
}


