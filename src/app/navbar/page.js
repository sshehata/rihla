'use client';

import { useUser } from '../context/userContext';
import Link from 'next/link';
import {useCart} from "../context/cartContext";
import { useRouter } from 'next/navigation';

const NavBar = ({ toggleCartVisibility }) => {
    const { user, logout } = useUser();
    const { cart } = useCart();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 text-white w-full fixed top-0 left-0 z-50 flex justify-between items-center shadow-lg">
            {user ? (
            <div className="flex items-center space-x-6">
                <Link href="/">Home</Link>
                <Link href="../shop">Shop</Link>
                <Link href="../contact">Contact</Link>
                <Link href="../artists">Artists</Link>
                {user && user.role === 'admin' && <Link href="../admin">Admin</Link>}
            </div>
            ) :  <div></div>}
            <div className="flex items-center space-x-6">
                {user ? (
                    <>
                        <span>{user.username}</span>
                        <button onClick={handleLogout} className="text-lg font-semibold hover:underline">Logout</button>
                    </>
                ) : (
                    <Link href="../login">Login</Link>
                )}
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
            </div>
        </nav>
    );
};

export default NavBar;
