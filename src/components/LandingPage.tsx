"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import { SparklesCore } from './ui/sparkles'
import { TypewriterEffectSmooth } from './ui/typewriter-effect'

const LandingPage = () => {
    const words = [
        {
            text: "Where",
        },
        {
            text: "passion",
        },
        {
            text: "meets",
        },
        {
            text: "precision",
        },
        {
            text: "Sago.",
            className: "text-blue-500 dark:text-blue-500",
        },

    ];
    const router = useRouter()
    const handel = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push("/home")
    }
    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md py-5">
            <div className='relative top-10'>
                <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
                    SAGO
                </h1>
                <div className="w-[40rem] h-40 relative">
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                </div>
            </div>




            {/* typewritter  Effect  */}
            <div className="flex flex-col items-center justify-center h-[40rem]  ">

                <TypewriterEffectSmooth words={words} />
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                    <button onClick={()=>{router.push('/auth/register')}} className="w-40 h-10 rounded-2xl bg-black border dark:border-white border-transparent cursor-pointer text-white text-sm hover:bg-white hover:text-black">
                        Join now
                    </button>
                    <button onClick={handel} className="w-40 h-10 rounded-2xl cursor-pointer hover:bg-black hover:text-white bg-white  text-black border border-red  text-sm">
                        Explore
                    </button>

                </div>
                <div className="w-[40rem] h-40 relative">
                    {/* Gradients */}

                    {/* Core component */}
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />

                    {/* Radial Gradient to prevent sharp edges */}
                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>

            </div>

        </div >
    )
}

export default LandingPage
