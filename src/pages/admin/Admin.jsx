import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminNavbar from "./AdminNavbar";

export default function Admin() {

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [revenue, setRevenue] = useState(0);

    const [pending, setPending] = useState(0);
    const [delivered, setDelivered] = useState(0);
    const [cancelled, setCancelled] = useState(0);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        // Load Products
        try {

            const productsRes = await api.get("/api/products");

            setTotalProducts(productsRes.data.length);

        } catch (error) {

            console.log("Products Error:", error);

        }

        // Load Orders
        try {

            const ordersRes = await api.get("/api/admin/orders");

            const orders = ordersRes.data;

            setTotalOrders(orders.length);

            const revenue = orders
                .filter(order => order.status === "DELIVERED")
                .reduce((sum, order) => sum + order.totalAmount, 0);

            setRevenue(revenue);

            setPending(
                orders.filter(o => o.status === "PENDING").length
            );

            setDelivered(
                orders.filter(o => o.status === "DELIVERED").length
            );

            setCancelled(
                orders.filter(o => o.status === "CANCELLED").length
            );

        } catch (error) {

            console.log("Orders Error:", error.response?.status);
            console.log(error.response?.data);

        }

    };

    return (

        <div className="min-h-screen bg-black text-white">

            <AdminNavbar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                {/* Header */}

                <div className="mb-10">

                    <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">
                        Welcome to LUXORA Admin Panel
                    </p>

                </div>

                {/* Statistics */}

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-10">

                    <div className="rounded-3xl p-8 bg-gradient-to-br from-purple-600 to-purple-900 shadow-xl">
                        <p>Total Products</p>
                        <h2 className="text-6xl font-black mt-4">
                            {totalProducts}
                        </h2>
                    </div>

                    <div className="rounded-3xl p-8 bg-gradient-to-br from-orange-500 to-red-600 shadow-xl">
                        <p>Total Orders</p>
                        <h2 className="text-6xl font-black mt-4">
                            {totalOrders}
                        </h2>
                    </div>

                    <div className="rounded-3xl p-8 bg-gradient-to-br from-pink-600 to-rose-800 shadow-xl">
                        <p>Total Revenue</p>
                        <h2 className="text-5xl font-black mt-4">
                            ₹{revenue.toLocaleString("en-IN")}
                        </h2>
                    </div>

                </div>

                {/* Order Status */}

                <h2 className="text-3xl font-bold mb-6">
                    Order Status
                </h2>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">

                    <div className="bg-yellow-600 rounded-3xl p-8">
                        <p>Pending Orders</p>
                        <h2 className="text-5xl font-black mt-4">
                            {pending}
                        </h2>
                    </div>

                    <div className="bg-green-700 rounded-3xl p-8">
                        <p>Delivered Orders</p>
                        <h2 className="text-5xl font-black mt-4">
                            {delivered}
                        </h2>
                    </div>

                    <div className="bg-red-700 rounded-3xl p-8">
                        <p>Cancelled Orders</p>
                        <h2 className="text-5xl font-black mt-4">
                            {cancelled}
                        </h2>
                    </div>

                </div>

                {/* Quick Actions */}

                <h2 className="text-3xl font-bold mb-8">
                    Quick Actions
                </h2>

                <div className="grid lg:grid-cols-3 gap-8">

                    <Link to="/admin/add-product">

                        <div className="rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black p-10 hover:scale-105 transition">

                            <div className="text-6xl">
                                ➕
                            </div>

                            <h2 className="text-3xl font-bold mt-5">
                                Add Product
                            </h2>

                            <p className="mt-2">
                                Add new jewellery
                            </p>

                        </div>

                    </Link>

                    <Link to="/admin/products">

                        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 hover:scale-105 transition">

                            <div className="text-6xl">
                                💎
                            </div>

                            <h2 className="text-3xl font-bold mt-5">
                                Products
                            </h2>

                            <p className="mt-2">
                                Manage Products
                            </p>

                        </div>

                    </Link>

                    <Link to="/admin/orders">

                        <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 p-10 hover:scale-105 transition">

                            <div className="text-6xl">
                                📦
                            </div>

                            <h2 className="text-3xl font-bold mt-5">
                                Orders
                            </h2>

                            <p className="mt-2">
                                Manage Customer Orders
                            </p>

                        </div>

                    </Link>

                </div>

            </div>

        </div>

    );
}