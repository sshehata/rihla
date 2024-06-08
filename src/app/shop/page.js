'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cartContext';

export default function ShopPage() {
  const [paintings, setPaintings] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const { cart, addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchPaintings = async () => {
      const response = await fetch('/api/paintings');
      const data = await response.json();
      setPaintings(data);
    };

    fetchPaintings();
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleWalletConnect = (event) => {
    event.preventDefault();
    setWalletAddress(event.target.walletAddress.value);
    setIsPopupOpen(false);
  };

  const navigateToArtist = (artist) => {
    router.push(`/artists/${artist}`);
  };

  return (
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">NFT Paintings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paintings.map((painting) => (
              <div key={painting.id} className="bg-gray-200 dark:bg-gray-800 p-6 rounded shadow-lg">
                <img src={painting.image} alt={painting.name} className="w-full h-64 object-cover rounded mb-4" />
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
        {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-4">Connect to XRPL Wallet</h2>
                <form onSubmit={handleWalletConnect}>
                  <label className="block mb-2">
                    Wallet Address:
                    <input
                        type="text"
                        name="walletAddress"
                        className="w-full p-2 mt-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                        required
                    />
                  </label>
                  <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-2"
                    >
                      Connect
                    </button>
                    <button
                        type="button"
                        onClick={closePopup}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
        {responseMessage && (
            <div className="mt-4 p-4 bg-green-200 dark:bg-green-800 rounded">
              {responseMessage}
            </div>
        )}
      </div>
  );
}
