"use client"
import React, { useState } from "react";
import { Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

function Navbar({ className }: { className?: string }) {
    const { totalItems } = useCart()
    const [active, setActive] = useState<string | null>(null)
    const { data: session } = useSession()

    const getInitials = (name?: string) => {
        if (!name) return ''
        const words = name.trim().split(' ') || []
        const first = words[0]?.[0] || ''
        const last = words[1]?.[0] || ''
        console.log(first, last)
        return (first + last).toUpperCase()
    }

    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <Link href={'/home'}>
                    <MenuItem setActive={setActive} active={active} item="Home" />
                </Link>

                <Link href={'/home/#footer'}>
                    <MenuItem setActive={setActive} active={active} item="About Us" />
                </Link>

                <Link href={"/contact"}>
                    <MenuItem setActive={setActive} active={active} item="Contact Us" />
                </Link>

                <Link href={'/cart'}>
                    <div className="relative flex items-center">
                        <MenuItem setActive={setActive} active={active} item="Cart" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-5 bg-purple-400 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>
                </Link>
                {
                    !session?.user &&
                    <Link href={"/auth/signin"}>
                        <MenuItem setActive={setActive} active={active} item="login" />
                    </Link>
                }



                {session?.user?.name && (
                    <div className="ml-4 relative group">
                        {/* Avatar */}
                        <div className="flex items-center  justify-center w-9 h-9 bg-purple-600 text-white rounded-full font-semibold text-sm cursor-pointer">
                            {getInitials(session.user.name)}
                           
                        </div>

                        {/* Logout button (shown on hover) */}
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="absolute top-11 left-1/2 -translate-x-1/2 bg-black border border-gray-300 px-3 py-1 text-sm text-red-500 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </Menu>
        </div>
    )
}

export default Navbar
