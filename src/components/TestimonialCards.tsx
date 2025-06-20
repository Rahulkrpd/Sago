"use client"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        quote: "Absolutely love the quality and fit. Makes me feel confident every day!",
        name: "James L.",
        title: "Men's Clothing"
    },
    {
        quote: "Elegant and stunning! I get compliments every time I wear it.",
        name: "Sophie W.",
        title: "Women's Clothing"
    },
    {
        quote: "The craftsmanship is incredible. Worth every penny.",
        name: "Anita R.",
        title: "Jewelery"
    },
    {
        quote: "This gadget is a game-changer — highly recommend for anyone who loves tech!",
        name: "Chris D.",
        title: "Electronics"
    },
    {
        quote: "Stylish and comfortable — easily my favorite shirt now.",
        name: "Robert P.",
        title: "Men's Clothing"
    },
    {
        quote: "These dresses are so flattering. The fabric feels luxurious.",
        name: "Emily G.",
        title: "Women's Clothing"
    },
    {
        quote: "I bought this necklace for a special occasion — and it was perfect!",
        name: "Diana M.",
        title: "Jewelery"
    },
    {
        quote: "My new headphones have amazing sound quality. Totally worth it.",
        name: "Kevin T.",
        title: "Electronics"
    },
    {
        quote: "The jeans fit perfectly and feel premium. Great value for the price.",
        name: "Aaron B.",
        title: "Men's Clothing"
    },
    {
        quote: "I love how stylish and functional this smartwatch is.",
        name: "Rachel S.",
        title: "Electronics"
    }
];

function TestimonialCards() {
    return (
        <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            <h2 className="text-3xl font-bold text-center mb-8 z-10">Hear our Harmony: Voices of success</h2>
            <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-6xl">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="left"
                        speed="slow"
                    />
                </div>
            </div>
        </div>
    )
}

export default TestimonialCards
