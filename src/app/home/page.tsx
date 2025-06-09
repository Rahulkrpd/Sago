import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ProductPage from '@/components/ProductPage'
import TestimonialCards from '@/components/TestimonialCards'
import React from 'react'

const page = () => {
    return (
        <main>
            <Navbar/>
            <HeroSection />
            <ProductPage />
            <TestimonialCards />

            <Footer />

        </main>
    )
}

export default page
