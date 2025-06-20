"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


import { StoreProvider } from "@/context/StoreContext";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider as NextAuthProvider } from 'next-auth/react'



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



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
        <NextAuthProvider>
          <StoreProvider>
            <CartProvider>
              <div className="w-full flex flex-col min-h-screen">

                {/* Navbar is now covered */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: '#333',
                      color: '#fff',
                      borderRadius: '10px',
                      padding: '16px',
                      fontSize: '14px',
                    },
                  }}
                />

                <main className="flex-grow w-full">
                  {children}
                </main>

              </div>
            </CartProvider>
          </StoreProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

