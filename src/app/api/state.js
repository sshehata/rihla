const collectibles= [
    {
        id: 1,
        name: 'Sunset',
        artworkPath: '/images/sunset.jpg',
        biometricsPath: '/images/sunset.jpg',
        priceXRP: 10,
        priceEUR: 12,
        artist: 'alex-rivera',
        owner: 'shop',
    },
    {
        id: 2,
        name: 'Ocean View',
        artworkPath: '/images/ocean.jpg',
        biometricsPath: '/images/ocean.jpg',
        priceXRP: 20,
        priceEUR: 24,
        artist: 'jordan-bennett',
        owner: 'shop',
    },
    {
        id: 3,
        name: 'Mountain',
        artworkPath: '/images/mountain.jpg',
        biometricsPath: '/images/mountain.jpg',
        priceXRP: 15,
        priceEUR: 18,
        artist: 'casey-morgan',
        owner: 'shop',
    },
    {
        id: 4,
        name: 'Mountain View',
        artworkPath: '/images/mountain.jpg',
        biometricsPath: '/images/mountain.jpg',
        priceXRP: 15,
        priceEUR: 18,
        artist: 'casey-morgan',
        owner: 'shop',
    },
    {
        id: 5,
        name: 'Mountain High',
        artworkPath: '/images/mountain.jpg',
        biometricsPath: '/images/mountain.jpg',
        priceXRP: 15,
        priceEUR: 18,
        artist: 'casey-morgan',
        owner: 'shop',
    },
    {
        id: 6,
        name: 'Mountain On Wheels',
        artworkPath: '/images/mountain.jpg',
        biometricsPath: '/images/mountain.jpg',
        priceXRP: 15,
        priceEUR: 18,
        artist: 'casey-morgan',
        owner: 'shop',
    },
    {
        id: 7,
        name: 'Sunset View',
        artworkPath: '/images/sunset.jpg',
        biometricsPath: '/images/sunset.jpg',
        priceXRP: 10,
        priceEUR: 12,
        artist: 'alex-rivera',
        owner: 'shop',
    },
    {
        id: 8,
        name: 'Sunset - set',
        artworkPath: '/images/sunset.jpg',
        biometricsPath: '/images/sunset.jpg',
        priceXRP: 10,
        priceEUR: 12,
        artist: 'alex-rivera',
        owner: 'shop',
    },
    {
        id: 9,
        name: 'Sunset - What',
        artworkPath: '/images/sunset.jpg',
        biometricsPath: '/images/sunset.jpg',
        priceXRP: 10,
        priceEUR: 12,
        artist: 'alex-rivera',
        owner: 'shop',
    },


    // Add more products as needed
];
export const getCollectibles = () => collectibles.filter(item => item.owner === 'shop');

export const addCollectible = (item) => {
    item.owner = 'shop';
    collectibles.push(item);
};

export const getUserCollectibles = (username) => collectibles.filter(item => item.owner === username);

export const transferOwnership = (collectibleId, fromUser, toUser) => {
    const collectible = collectibles.find(item => item.id === collectibleId);
    if (collectible && collectible.owner === fromUser) {
        collectible.owner = toUser;
    }
};

const artists = {
    'alex-rivera': {
        name: 'Alex Rivera',
        bio: 'Alex Rivera is a contemporary artist known for his stunning landscapes and vibrant color palettes.',
        image: '/images/alex-rivera.jpg',
    },
    'jordan-bennett': {
        name: 'Jordan Bennett',
        bio: 'Jordan Bennett is a renowned artist whose work captures the essence of the ocean and coastal life.',
        image: '/images/jordan-bennett.jpg',
    },
    'casey-morgan': {
        name: 'Casey Morgan',
        bio: 'Casey Morgan is a painter with a focus on mountain scenery and natural beauty.',
        image: '/images/casey-morgan.jpg',
    },
    // Add more artists as needed
};

export const getArtists = () =>artists

const users = {
    'john': {
        username: 'john',
        email: 'john@example.com',
        password: '123',
        role: 'user',
        ownedCollectibles: []
    },
    'alex': {
        username: 'alex',
        email: 'alex@example.com',
        password: '123',
        role: 'user',
        ownedCollectibles: []
    },
    'daniel': {
        username: 'daniel',
        email: 'daniel@example.com',
        password: '123',
        role: 'user',
        ownedCollectibles: []
    },
    'andrea': {
        username: 'andrea',
        email: 'andrea@example.com',
        password: '123',
        role: 'user',
        ownedCollectibles: []
    },
    'jane': {
        username: 'jane',
        email: 'jane@example.com',
        password: '123',
        role: 'admin'
    },
    // Add more users as needed
};

export const getUsers = () => users;

export const getUser = (username) => users[username];
