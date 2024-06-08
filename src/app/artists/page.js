import Link from 'next/link';

const artists = [
    {
        id: 'alex-rivera',
        name: 'Alex Rivera',
        image: '/images/alex-rivera.jpg',
        bio: 'Alex Rivera is a visionary artist known for his innovative and contemporary style.',
    },
    {
        id: 'jordan-bennett',
        name: 'Jordan Bennett',
        image: '/images/jordan-bennett.jpg',
        bio: 'Jordan Bennett creates vibrant and dynamic art that explores themes of nature and technology.',
    },
    {
        id: 'casey-morgan',
        name: 'Casey Morgan',
        image: '/images/casey-morgan.jpg',
        bio: 'Casey Morgan is a multi-talented artist whose work spans across multiple mediums and styles.',
    },
    // Add more artists as needed
];

export default function Artists() {
    return (
        <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl mb-4">Artists</h1>
            <div className="flex flex-wrap justify-start space-x-4">
                {artists.map(artist => (
                    <div key={artist.id} className="p-4 bg-gray-200 rounded mb-4 dark:bg-gray-800 w-72 flex flex-col justify-between">
                        <div className="flex-grow flex items-center justify-center mb-4">
                            <img src={artist.image} alt={artist.name} className="rounded h-48 object-contain" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl mb-2">{artist.name}</h2>
                            <p className="mb-2">{artist.bio}</p>
                            <Link href={`/artists/${artist.id}`} className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600">
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
