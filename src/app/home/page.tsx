import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import ProductPage from '@/components/ProductPage'
import TestimonialCards from '@/components/TestimonialCards'
import React from 'react'

const page = () => {
    return (
        <main>
            <HeroSection />
            <ProductPage />
            <TestimonialCards />

            <Footer />

        </main>
    )
}

export default page
