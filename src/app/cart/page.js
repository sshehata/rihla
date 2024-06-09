// cart/page.js

'use client';

import { useCart } from '../context/cartContext';
import { useGlobalContext } from '@/app/state-provider';
import {useUser} from "@/app/context/userContext";

const Cart = ({ isVisible, toggleVisibility }) => {
    const { cart, removeFromCart, clearCart } = useCart();
    const { handleTransferOwnership } = useGlobalContext();
    const { user } = useUser(); // Assuming useUser is correctly implemented

    const handleCheckout = () => {
        cart.forEach(item => {
            handleTransferOwnership(item.id, 'shop', user.username); // Transfer ownership from shop to the current user
        });
        clearCart(); // Clear the cart after checkout
        toggleVisibility(); // Close the cart modal
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-4">Shopping Cart</h2>
                {cart.map((item) => (
                    <div key={item.id} className="mb-4">
                        <img src={item.artworkPath} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p>Price: {item.priceXRP} XRP / €{item.priceEUR}</p>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                {cart.length > 0 && (
                    <button
                        onClick={handleCheckout}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Checkout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cart;
