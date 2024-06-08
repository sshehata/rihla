export default function Home() {
  return (
      <div className="container mx-auto px-4 py-8 mt-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Rihla</h1>
        <p className="text-xl mb-8">Empowering Artists Through Innovation and Transparency</p>
        <img src="/images/posh-art-gallery.jpg" alt="Posh Art Gallery" className="w-full h-auto rounded mb-8 shadow-lg" />
        <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            We are a small company who cares about artists. Our mission is to create and validate NFTs for artists, linking them with biometrics from the artist and being transparent about their earnings. We facilitate the market for buying art NFTs, ensuring a secure and trustworthy platform for both artists and buyers.
          </p>
          <p className="mb-4">
            Our platform provides artists with a way to digitize their art and monetize their creativity. By leveraging blockchain technology, we ensure that each piece of art is unique, verifiable, and securely stored on the blockchain. Our commitment to transparency means that artists can track their earnings and buyers can trust the authenticity of their purchases.
          </p>
          <p className="mb-4">
            Join us in revolutionizing the art market and supporting artists around the world.
          </p>
        </div>
      </div>
  );
}
