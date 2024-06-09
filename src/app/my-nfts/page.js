// my-nfts/page.js

'use client';

import { useGlobalContext } from '@/app/state-provider';
import { useUser } from '../context/userContext';

export default function MyNFTsPage() {
    const { getUserCollectibles } = useGlobalContext();
    const { user } = useUser();
    const userCollectibles = getUserCollectibles(user.username);

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8">My NFTs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {userCollectibles.map((collectible) => (
                    <div key={collectible.id} className="bg-gray-200 dark:bg-gray-800 p-6 rounded shadow-lg">
                        <img src={collectible.artworkPath} alt={collectible.name} className="w-full h-64 object-cover rounded mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">{collectible.name}</h2>
                        <p className="mb-2">Price: {collectible.priceXRP} XRP / €{collectible.priceEUR}</p>
                        <p className="mb-4">Artist: {collectible.artist}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
