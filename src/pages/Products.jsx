import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Heart } from "lucide-react";

export default function Products() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Gold");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ⭐ Add this here
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // fetchProducts...

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/products/explore", {
        params: {
          category,
          keyword: search,
        },
      });

      if (!res.data || res.data.length === 0) {
        setProducts([]);
        return;
      }

      const data = await Promise.all(
        res.data.map(async (p) => {
          try {
            const priceRes = await api.get(
              `/api/product-price/${p.id}`
            );

            return {
              ...p,
              price: Number(priceRes.data),
            };
          } catch {
            return { ...p, price: 0 };
          }
        })
      );

      setProducts(data);

    } catch (err) {
      console.log(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DEBOUNCE SAFE EFFECT
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(timer);
  }, [category, search]);

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HEADER */}
      <div className="text-center py-12 px-6">
        <h1 className="text-5xl md:text-6xl font-light tracking-[6px]">
          LUXURY COLLECTION
        </h1>
        <p className="text-gray-400 mt-3 tracking-widest text-sm">
          Handcrafted elegance • Timeless beauty
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jewellery..."
          className="
            w-full max-w-md
            bg-white/10
            border border-white/20
            rounded-full
            px-6 py-3
            text-white
            outline-none
            focus:border-yellow-500
          "
        />
      </div>

      {/* CATEGORY */}
      <div className="flex justify-center gap-5 mb-12">

        {["Gold", "Silver", "Diamond"].map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`
              px-6 py-2 rounded-full transition
              ${category === item
                ? "bg-yellow-500 text-black"
                : "bg-white/10 hover:bg-yellow-500 hover:text-black"}
            `}
          >
            {item}
          </button>
        ))}

      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">
          Loading products...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-400">
          {error}
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && products.length === 0 && !error && (
        <p className="text-center text-gray-400">
          No products found
        </p>
      )}

      {/* PRODUCTS */}
     {/* PRODUCTS */}
<div className="grid md:grid-cols-3 gap-12 px-10 pb-24">

  {products.map((p, i) => (

    <div
      key={p.id}
      style={{ animationDelay: `${i * 0.1}s` }}
      className="
        relative
        bg-white/5
        border border-white/10
        rounded-3xl
        overflow-hidden
        transition-all
        duration-700
        hover:scale-[1.05]
        hover:border-yellow-400/40
        hover:shadow-[0_0_40px_rgba(234,179,8,0.15)]
        animate-[fadeIn_0.8s_ease_forwards]
        opacity-0
        group
      "
    >

      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(p.id);
        }}
        className="
          absolute
          top-4
          right-4
          z-20
          w-10
          h-10
          rounded-full
          bg-white
          shadow-lg
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-110
        "
      >
        <Heart
          size={20}
          className={`transition-all duration-300 ${
            wishlist.includes(p.id)
              ? "fill-red-500 text-red-500"
              : "text-gray-500"
          }`}
        />
      </button>

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={p.imageUrl}
          alt={p.name}
          className="
            h-[260px]
            w-full
            object-cover
            transition-all
            duration-700
            group-hover:scale-110
          "
        />
      </div>

      {/* Details */}
      <div className="p-6 text-center">

        <h2 className="text-xl font-medium">
          {p.name}
        </h2>

        <p className="text-yellow-400 text-lg mt-2 font-semibold">
          ₹ {p.price.toLocaleString()}
        </p>

        <button
          onClick={() => navigate(`/product/${p.id}`)}
          className="
            mt-5
            w-full
            py-3
            rounded-full
            bg-yellow-500
            text-black
            font-semibold
            tracking-wide
            transition-all
            duration-300
            hover:bg-yellow-400
            hover:scale-105
          "
        >
          EXPLORE
        </button>

      </div>

    </div>

  ))}

      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}