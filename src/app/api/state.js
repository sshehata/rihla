const collectibles= [
    {
        id: 1,
        name: 'Sunset',
        artworkPath: '/images/sunset.jpg',
        biometricsPath: '/images/sunset.jpg',
        priceXRP: 10,
        priceEUR: 12,
        artist: 'alex-rivera',
    },
    {
        id: 2,
        name: 'Ocean View',
        artworkPath: '/images/ocean.jpg',
        biometricsPath: '/images/ocean.jpg',
        priceXRP: 20,
        priceEUR: 24,
        artist: 'jordan-bennett',
    },
    {
        id: 3,
        name: 'Mountain',
        artworkPath: '/images/mountain.jpg',
        biometricsPath: '/images/mountain.jpg',
        priceXRP: 15,
        priceEUR: 18,
        artist: 'casey-morgan',
    },
    {
        id: 4,
        name: 'Mountain View',
        artworkPath: '/images/mountain.jpg',
        biometricsPath: '/images/mountain.jpg',
        priceXRP: 15,
        priceEUR: 18,
        artist: 'casey-morgan',
    },
    {
        id: 5,
        name: 'Mountain High',
        artworkPath: '/images/mountain.jpg',
        biometricsPath: '/images/mountain.jpg',
        priceXRP: 15,
        priceEUR: 18,
        artist: 'casey-morgan',
    },
    {
        id: 6,
        name: 'Mountain On Wheels',
        artworkPath: '/images/mountain.jpg',
        biometricsPath: '/images/mountain.jpg',
        priceXRP: 15,
        priceEUR: 18,
        artist: 'casey-morgan',
    },
    {
        id: 7,
        name: 'Sunset View',
        artworkPath: '/images/sunset.jpg',
        biometricsPath: '/images/sunset.jpg',
        priceXRP: 10,
        priceEUR: 12,
        artist: 'alex-rivera',
    },
    {
        id: 8,
        name: 'Sunset - set',
        artworkPath: '/images/sunset.jpg',
        biometricsPath: '/images/sunset.jpg',
        priceXRP: 10,
        priceEUR: 12,
        artist: 'alex-rivera',
    },
    {
        id: 9,
        name: 'Sunset - What',
        artworkPath: '/images/sunset.jpg',
        biometricsPath: '/images/sunset.jpg',
        priceXRP: 10,
        priceEUR: 12,
        artist: 'alex-rivera',
    },


    // Add more products as needed
];

export const getCollectibles = () => collectibles

export const addCollectible= (item) => collectibles.push(item)

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
        role: 'user'
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