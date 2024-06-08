export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <p className="mb-4">
                    We'd love to hear from you! Reach out to us through any of the following ways:
                </p>
                <div className="text-left">
                    <p className="mb-2">
                        <strong>Address:</strong> 123 Art Street, Creativity City, ART 12345
                    </p>
                    <p className="mb-2">
                        <strong>Phone:</strong> (123) 456-7890
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> contact@rihla.com
                    </p>
                </div>
            </div>
        </div>
    );
}
