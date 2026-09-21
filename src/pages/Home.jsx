import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import GoldRateBox from "../components/GoldRateBox";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
    
      {/* Navbar */}
      <Navbar />

      {/* 🔥 LIVE RATE TICKER (PROFESSIONAL TOP BAR STYLE) */}
      <div className="sticky top-[80px] z-40 px-4 md:px-20 mt-4">
        <GoldRateBox />
      </div>

      {/* HERO SECTION */}
      <section className="grid lg:grid-cols-2 items-center px-8 md:px-20 py-20 gap-20">

        {/* LEFT */}
        <div>
          <div className="inline-block bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-full mb-6">
            Premium Luxury Jewelry
          </div>

          <h1 className="text-7xl md:text-8xl font-black leading-tight mb-8">
            Shine With
            <span className="block text-yellow-400">Elegance</span>
          </h1>

          <p className="text-gray-400 text-xl leading-relaxed mb-10">
            Discover premium handcrafted jewelry collections with timeless beauty,
            luxury diamonds, elegant gold, and royal craftsmanship.
          </p>

          <div className="flex gap-5 flex-wrap">
            <Link to="/products">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition">
                Explore Collection
              </button>
            </Link>

            <Link to="/register">
              <button className="border border-yellow-500 px-8 py-4 rounded-full text-lg hover:bg-yellow-500 hover:text-black transition">
                Join Now
              </button>
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div>
              <h2 className="text-5xl font-black text-yellow-400">10K+</h2>
              <p className="text-gray-400 mt-2">Customers</p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-yellow-400">500+</h2>
              <p className="text-gray-400 mt-2">Designs</p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-yellow-400">15+</h2>
              <p className="text-gray-400 mt-2">Years</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>

          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury Jewelry"
            className="relative rounded-[40px] h-[700px] w-full object-cover border border-yellow-500/20 shadow-2xl hover:scale-105 transition duration-700"
          />
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="px-8 md:px-20 py-20">

        <h2 className="text-6xl font-black text-center mb-16">
          Featured Jewelry
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="bg-white/5 rounded-[35px] overflow-hidden border border-white/10 hover:-translate-y-3 transition duration-500 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop"
              className="h-[400px] w-full object-cover"
              alt="Diamond Ring"
            />
            <div className="p-7">
              <h3 className="text-3xl font-bold mb-3">Diamond Ring</h3>
              <p className="text-yellow-400 text-3xl font-black mb-6">₹1,25,999</p>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4 rounded-2xl text-lg font-bold">
                Buy Now
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/5 rounded-[35px] overflow-hidden border border-white/10 hover:-translate-y-3 transition duration-500 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop"
              className="h-[400px] w-full object-cover"
              alt="Gold Necklace"
            />
            <div className="p-7">
              <h3 className="text-3xl font-bold mb-3">Gold Necklace</h3>
              <p className="text-yellow-400 text-3xl font-black mb-6">₹89,999</p>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4 rounded-2xl text-lg font-bold">
                Buy Now
              </button>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white/5 rounded-[35px] overflow-hidden border border-white/10 hover:-translate-y-3 transition duration-500 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1200&auto=format&fit=crop"
              className="h-[400px] w-full object-cover"
              alt="Royal Earrings"
            />
            <div className="p-7">
              <h3 className="text-3xl font-bold mb-3">Royal Earrings</h3>
              <p className="text-yellow-400 text-3xl font-black mb-6">₹45,999</p>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4 rounded-2xl text-lg font-bold">
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}