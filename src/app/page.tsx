import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductPage from "@/components/ProductPage";
import TestimonialCards from "@/components/TestimonialCards";


export default function Home() {
  return (
    <main className="min-h-screenn bg-black/[0.96] antialiased bg-grid-white/[0.02] ">
      {/* <h1 className="text-center text-2xl">Sagole</h1> */}
      <HeroSection />
      <ProductPage />
      <TestimonialCards />

      <Footer />
    </main>
  );
}
