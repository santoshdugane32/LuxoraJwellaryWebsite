import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AdminNavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");
    };

    const linkClass = (path) =>
        `transition font-medium ${
            location.pathname === path
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
        }`;

    return (

        <nav className="sticky top-0 z-50 bg-black border-b border-yellow-500 shadow-lg">

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <Link
                    to="/admin"
                    className="text-4xl font-black text-yellow-400 tracking-wide"
                >
                    LUXORA ADMIN
                </Link>

                <div className="flex items-center gap-10">

                    <Link
                        to="/admin"
                        className={linkClass("/admin")}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/add-product"
                        className={linkClass("/admin/add-product")}
                    >
                        Add Product
                    </Link>

                    <Link
                        to="/admin/products"
                        className={linkClass("/admin/products")}
                    >
                        Products
                    </Link>

                    <Link
                        to="/admin/orders"
                        className={linkClass("/admin/orders")}
                    >
                        Orders
                    </Link>

                </div>

                <button
                    onClick={logout}
                    className="
                        bg-red-500
                        hover:bg-red-600
                        px-6
                        py-2
                        rounded-lg
                        font-semibold
                        transition
                    "
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}