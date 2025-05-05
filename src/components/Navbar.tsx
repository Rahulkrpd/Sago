"use client"
import React, { useState } from "react";
import { Menu, MenuItem, } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

import Link from 'next/link';

function Navbar({ className }: { className?: string }) {
    const { totalItems } = useCart()
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive} >
                <Link href={'/home'}>
                    <MenuItem setActive={setActive} active={active} item="Home">

                    </MenuItem>
                </Link>

                <Link href={'/home/#footer'}>
                    <MenuItem setActive={setActive} active={active} item="About Us">

                    </MenuItem>
                </Link>

                <Link href={"/contact"}>
                    <MenuItem setActive={setActive} active={active} item="Contact Us">

                    </MenuItem>
                </Link>

                <Link href={'/cart'}>
                    <div className="relative flex items-center">
                        <MenuItem setActive={setActive} active={active} item="Cart" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-5  bg-purple-400 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>


                </Link>
            </Menu>
        </div>
    )
}

export default Navbar
