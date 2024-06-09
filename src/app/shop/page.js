// shop/page.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cartContext';
import { useGlobalContext } from '@/app/state-provider';

export default function ShopPage() {
    const { collectibles } = useGlobalContext();
    const { cart, addToCart } = useCart();
    const router = useRouter();

    const navigateToArtist = (artist) => {
        router.push(`/artists/${artist}`);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8">NFT Paintings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {collectibles.map((painting) => (
                    <div key={painting.id} className="bg-gray-200 dark:bg-gray-800 p-6 rounded shadow-lg">
                        <img src={painting.artworkPath} alt={painting.name} className="w-full h-64 object-cover rounded mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">{painting.name}</h2>
                        <p className="mb-2">Price: {painting.priceXRP} XRP / €{painting.priceEUR}</p>
                        <p className="mb-4">Artist: {painting.artist}</p>
                        <div className="flex justify-between space-x-2">
                            <button
                                className={`bg-blue-500 text-white px-4 py-2 rounded ${cart?.some(item => item.id === painting.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => addToCart(painting)}
                                disabled={cart?.some(item => item.id === painting.id)}
                            >
                                {cart?.some(item => item.id === painting.id) ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => navigateToArtist(painting.artist)}
                            >
                                About the Artist
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
