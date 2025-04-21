"use client"
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, } from "../components/ui/navbar-menu";
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
                <Link href={'/'}>
                    <MenuItem setActive={setActive} active={active} item="Home">

                    </MenuItem>
                </Link>
                <Link href={'#products'}>
                    <MenuItem setActive={setActive} active={active} item="Product">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/product">Products</HoveredLink>

                        </div>
                        <div className="flex flex-col space-y-4 text-sm">
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                                    {totalItems}
                                </span>
                            )}
                            <Link href="/cart">Cart</Link>

                        </div>
                    </MenuItem>
                </Link>
                <Link href={'#footer'}>
                    <MenuItem setActive={setActive} active={active} item="About Us">

                    </MenuItem>
                </Link>
                <Link href={"/contact"}>
                    <MenuItem setActive={setActive} active={active} item="Contact Us">

                    </MenuItem>
                </Link>
            </Menu>
        </div>
    )
}

export default Navbar
