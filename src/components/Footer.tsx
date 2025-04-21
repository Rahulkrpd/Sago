const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 p-12" id='footer'>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:px-6 lg:px-8">

                {/* About Us */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
                    <p className="text-sm">
                        Welcome to Sogo – your trusted destination for quality products across fashion,
                        jewelry, and electronics. We pride ourselves on delivering style, comfort,
                        and cutting-edge innovation.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">Products</a></li>
                        <li><a href="#" className="hover:text-white">Testimonials</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Follow Us */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Instagram</a></li>
                        <li><a href="#" className="hover:text-white">Facebook</a></li>
                        <li><a href="#" className="hover:text-white">Twitter</a></li>
                        <li><a href="#" className="hover:text-white">YouTube</a></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="text-sm">
                        Email: support@sogo.com<br />
                        Phone: +1 234 567 890<br />
                        Address: 123 Market Street, San Francisco, CA
                    </p>
                </div>
            </div>

            <div className="mt-10 text-center  pt-6 text-xs">
                <p>&copy; {new Date().getFullYear()} Sogo. All rights reserved.</p>
                <p>Created by Rahul.</p>
            </div>
        </footer>
    );
};

export default Footer;
