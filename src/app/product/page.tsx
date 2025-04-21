import React from 'react'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"

const page = () => {
    return (
        <div className="mt-10 px-4">
            <CardContainer className="inter-var">
                <CardBody className="bg-white dark:bg-black border border-black/10 dark:border-white/20 rounded-2xl p-6 w-full max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Product Image */}
                        <CardItem translateZ="80" className="w-full">
                            <Image
                                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                                alt="test"
                                width={800}
                                height={800}
                                className="w-full h-[300px] sm:h-[400px] object-contain rounded-xl"
                            />
                        </CardItem>

                        {/* Product Details */}
                        <div className="space-y-3">
                            <CardItem translateZ="50" className="text-2xl font-bold text-neutral-800 dark:text-white">
                                Rahul
                            </CardItem>

                            <CardItem translateZ="40" className="text-sm text-gray-500 dark:text-gray-400">
                                Men's Product
                            </CardItem>

                            <CardItem translateZ="50" className="text-xl font-semibold text-black dark:text-white">
                                $100
                            </CardItem>

                            <CardItem translateZ="30" className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                This is a good image/product description. Lightweight, durable, and fits perfectly.
                            </CardItem>

                            <CardItem translateZ="20" className="text-sm text-gray-500 mt-2">
                                ⭐ 5 (1220 reviews)
                            </CardItem>
                        </div>
                    </div>

                    {/* Action Buttons */}
                   
                </CardBody>
            </CardContainer>
        </div>
    )
}

export default page
