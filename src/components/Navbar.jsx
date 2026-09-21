import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {

  const { user, logout } = useAuth();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {

    if (!user) {
      setCartCount(0);
      return;
    }

    const loadCart = () => {

      // Don't show cart for admin
      if (user.role === "ADMIN") {
        setCartCount(0);
        return;
      }

      const cartKey = `cart_${user.id}`;

      const cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

      setCartCount(cart.length);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
    };

  }, [user]);

  const linkStyle =
    "relative px-4 py-2 text-white font-medium text-lg rounded-full transition-all duration-300 hover:bg-white/15 hover:scale-105";

  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-gradient-to-r from-yellow-700 via-yellow-500 to-orange-500 shadow-lg sticky top-0 z-50">

      {/* LOGO */}
      <Link to="/">
        <h1 className="text-4xl font-black tracking-widest text-white hover:scale-105 transition duration-300">
          LUXORA
        </h1>
      </Link>

      {/* LINKS */}
      <div className="hidden md:flex gap-3 items-center">

        {/* HOME */}
        <Link className={linkStyle} to="/">
          Home
        </Link>

        {/* USER MENU */}
        {user?.role !== "ADMIN" && (
          <>
            <Link className={linkStyle} to="/products">
              Products
            </Link>

            <Link
              to="/cart"
              id="cart-icon"
              className={`${linkStyle} relative group`}
            >
              <div className="flex items-center gap-2">

                <FaShoppingCart
                  size={24}
                  className="
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:text-yellow-200
                    group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.9)]
                  "
                />

                <span>Cart</span>

                {cartCount > 0 && (
                  <span
                    className="
                      absolute
                      -top-2
                      -right-2
                      bg-red-500
                      text-white
                      text-xs
                      font-bold
                      w-6
                      h-6
                      flex
                      items-center
                      justify-center
                      rounded-full
                      border-2 border-white
                      animate-pulse
                    "
                  >
                    {cartCount}
                  </span>
                )}

              </div>
            </Link>

            <Link className={linkStyle} to="/my-orders">
              My Orders
            </Link>
          </>
        )}

        {/* LOGIN / REGISTER */}
        {!user && (
          <>
            <Link className={linkStyle} to="/login">
              Login
            </Link>

            <Link className={linkStyle} to="/register">
              Register
            </Link>
          </>
        )}

        {/* ADMIN MENU */}
        {user?.role === "ADMIN" && (
          <Link
            to="/admin"
            className={linkStyle}
          >
            Admin Dashboard
          </Link>
        )}

        {/* PROFILE */}
        {user && (
          <div className="relative group ml-2 cursor-pointer">

            <FaUserCircle
              size={34}
              className="
                text-white
                transition-all duration-300
                group-hover:scale-110
                group-hover:rotate-6
              "
            />

            {/* DROPDOWN */}
            <div
              className="
                absolute
                right-0
                mt-3
                w-60
                bg-white
                text-black
                rounded-2xl
                shadow-2xl
                opacity-0
                invisible
                group-hover:opacity-100
                group-hover:visible
                translate-y-2
                group-hover:translate-y-0
                transition-all
                duration-300
                overflow-hidden
                z-50
              "
            >

              <div className="p-4 border-b">

                <p className="font-bold">
                  {user.name}
                </p>

                <p className="text-sm text-gray-600">
                  {user.email}
                </p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                  {user.role}
                </span>

              </div>

              {user.role !== "ADMIN" && (
                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  My Profile
                </Link>
              )}

              <button
                onClick={logout}
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  text-red-600
                  hover:bg-red-50
                  font-semibold
                "
              >
                Logout
              </button>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}