"use client"; // This marks the component as a Client Component

const artistsData = {
    'alex-rivera': {
        name: 'Alex Rivera',
        image: '/images/alex-rivera.jpg',
        bio: 'Alex Rivera is a visionary artist known for his innovative and contemporary style.',
    },
    'jordan-bennett': {
        name: 'Jordan Bennett',
        image: '/images/jordan-bennett.jpg',
        bio: 'Jordan Bennett creates vibrant and dynamic art that explores themes of nature and technology.',
    },
    'casey-morgan': {
        name: 'Casey Morgan',
        image: '/images/casey-morgan.jpg',
        bio: 'Casey Morgan is a multi-talented artist whose work spans across multiple mediums and styles.',
    },
};

export default function ArtistPage({ params }) {
    const { artist } = params;

    const artistInfo = artistsData[artist];

    if (!artistInfo) {
        return <div>Artist not found</div>;
    }

    return (
        <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl mb-4">{artistInfo.name}</h1>
            <img src={artistInfo.image} alt={artistInfo.name} className="rounded mb-4 h-48 object-contain" />
            <p>{artistInfo.bio}</p>
        </div>
    );
}
