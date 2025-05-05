
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import ConditionalNavbar from "@/components/ConditionalNavbar";
import { StoreProvider } from "@/context/StoreContext";
import { CartProvider } from "@/context/CartContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAGO",
  description: "Sago ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen bg-background text-foreground`}
      >
        <StoreProvider>
          <CartProvider>

            <div className="w-full flex flex-col min-h-screen">
              <ConditionalNavbar />
              <main className="flex-grow w-full">

                {children}</main>
            </div>
          </CartProvider>
        </StoreProvider>



      </body>
    </html>
  );
}
