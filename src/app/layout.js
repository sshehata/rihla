'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "@/app/state-provider";
import { useState } from "react";
import { CartProvider } from "./context/cartContext";
import { UserProvider } from "./context/userContext";
import Cart from "./cart/page";
import NavBar from "./navbar/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <GlobalContextProvider>
            <UserProvider>
                <CartProvider>
                    <LayoutContent>{children}</LayoutContent>
                </CartProvider>
            </UserProvider>
        </GlobalContextProvider>
        </body>
        </html>
    );
}

function LayoutContent({ children }) {
    const [isCartVisible, setIsCartVisible] = useState(false);

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <>
            <NavBar toggleCartVisibility={toggleCartVisibility} />
            <Cart isVisible={isCartVisible} toggleVisibility={toggleCartVisibility} />
            <div className="container mx-auto px-4 py-8 mt-16">
                {children}
            </div>
        </>
    );
}
