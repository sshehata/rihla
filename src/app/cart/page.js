"use client";

import { useCart } from '../context/cartContext';
import { useState } from 'react';

const Cart = ({ isVisible, toggleVisibility }) => {
    const { cart, removeFromCart } = useCart();
    const [walletAddress, setWalletAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckout = async () => {
        try {
            await checkout(cart, walletAddress);
            setMessage('Payment successful');
            setCart([]);
        } catch (error) {
            setMessage('Payment failed');
        }
    };

    return (
        <>
            {isVisible && (
                <div className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 p-4 shadow-lg z-50 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl">Shopping Cart</h2>
                        <button onClick={toggleVisibility} className="text-xl">✖</button>
                    </div>
                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <div key={index} className="p-4 bg-gray-200 rounded mb-4 dark:bg-gray-800">
                                <img src={item.image} alt={item.name} className="rounded mb-2 h-32 object-contain" />
                                <h2 className="text-xl">{item.name}</h2>
                                <p>Price: {item.priceXRP} XRP / €{item.priceEUR}</p>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <label className="block mb-2 mt-4">
                        Wallet Address:
                        <input
                            type="text"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="w-full p-2 mt-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </label>
                    <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={handleCheckout}>
                        Checkout
                    </button>
                    {message && (
                        <div className={`mt-4 p-4 ${message.includes('successful') ? 'bg-green-200 dark:bg-green-800' : 'bg-red-200 dark:bg-red-800'} rounded`}>
                            {message}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Cart;
