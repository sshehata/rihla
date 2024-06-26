'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import {GlobalContextProvider} from "@/app/state-provider";
import { useState } from "react";
import { CartProvider, useCart } from "./context/cartContext";
import Cart from "./cart/page";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <GlobalContextProvider>
        <CartProvider>
            <LayoutContent>{children}</LayoutContent>
        </CartProvider>
        </GlobalContextProvider>
        </body>
        </html>
    );
}

function LayoutContent({ children }) {
    const [isCartVisible, setIsCartVisible] = useState(false);
    const { cart } = useCart();

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <>
            <nav className="bg-gray-800 p-4 text-white w-full fixed top-0 left-0 z-50 flex justify-between items-center shadow-lg">
                <div className="flex items-center space-x-6">
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/shop">
                        Shop
                    </Link>
                    <Link href="/contact">
                        Contact
                    </Link>
                    <Link href="/artists">
                        Artists
                    </Link>
                    <Link href="/admin">
                        Admin
                    </Link>
                </div>
                <button onClick={toggleCartVisibility} className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l3.6-8H6.4M7 13L6.4 11M7 13l1.35 6.74M7 13h10M7 21h10a1 1 0 001-1v-6H6v6a1 1 0 001 1zM10 6h4"
                        />
                    </svg>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 bg-red-600 text-white rounded-full text-sm">
              {cart.length}
            </span>
                    )}
                </button>
            </nav>
            <Cart isVisible={isCartVisible} toggleVisibility={toggleCartVisibility} />
            <div className="container mx-auto px-4 py-8 mt-16">
                {children}
            </div>
            </>
    );
}
