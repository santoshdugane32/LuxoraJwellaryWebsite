export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 mt-20">

      <div className="grid md:grid-cols-4 gap-10 px-8 md:px-20 py-16">

        {/* Logo */}
        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent mb-5">
            LUXORA
          </h1>

          <p className="text-gray-400 leading-relaxed">
            Premium handcrafted luxury jewelry collections
            designed with timeless elegance.
          </p>

        </div>

        {/* Collections */}
        <div>

          <h2 className="text-2xl font-bold mb-5">
            Collections
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li>Gold Jewelry</li>
            <li>Diamond Rings</li>
            <li>Luxury Necklaces</li>
            <li>Wedding Collection</li>
          </ul>

        </div>

        {/* Links */}
        <div>

          <h2 className="text-2xl font-bold mb-5">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Login</li>
          </ul>

        </div>

        {/* Contact */}
        <div>

          <h2 className="text-2xl font-bold mb-5">
            Contact
          </h2>

          <div className="space-y-3 text-gray-400">
            <p>📍 Galatga, Karnataka</p>
            <p>📞 +91 9343311645</p>
            <p>✉ luxora@gmail.com</p>
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-gray-500">
        © 2026 Luxora Jewelry. All rights reserved.
      </div>

    </footer>
  );
}