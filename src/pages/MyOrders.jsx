import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import OrderTimeline from "../components/OrderTimeline";

export default function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");

    const size = 5;

    const fetchOrders = async (
        pageNo = page,
        statusValue = status,
        searchValue = search
    ) => {

        try {

            setLoading(true);

            const res = await api.get("/api/orders/user", {

                params: {

                    page: pageNo,
                    size,
                    status: statusValue || undefined,
                    search: searchValue || undefined

                }

            });

            setOrders(res.data.content);
            setTotalPages(res.data.totalPages);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchOrders(0, status, search);

    }, [status]);

    useEffect(() => {

        fetchOrders(page, status, search);

    }, [page]);

    useEffect(() => {

        const timer = setTimeout(() => {

            setPage(0);

            fetchOrders(0, status, search);

        }, 400);

        return () => clearTimeout(timer);

    }, [search]);

    return (

        <div className="min-h-screen bg-black text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                <h1 className="text-5xl font-black mb-8">
                    My Orders
                </h1>

                {/* SEARCH */}

                <input

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    placeholder="Search Order ID or Product..."

                    className="
                        w-full
                        md:w-96
                        mb-6
                        px-5
                        py-3
                        rounded-full
                        bg-white/10
                        border
                        border-white/20
                        outline-none
                    "

                />

                {/* FILTER */}

                <div className="flex flex-wrap gap-3 mb-8">

                    {[
                        "",
                        "PENDING",
                        "CONFIRMED",
                        "QUALITY_CHECK",
                        "PACKED",
                        "SHIPPED",
                        "OUT_FOR_DELIVERY",
                        "DELIVERED",
                        "CANCELLED"
                    ].map((s) => (

                        <button

                            key={s}

                            onClick={() => {

                                setPage(0);

                                setStatus(s);

                            }}

                            className={`
                                px-4
                                py-2
                                rounded-full
                                border
                                transition
                                ${
                                    status === s
                                        ? "bg-yellow-500 text-black"
                                        : "border-white/20 text-white hover:border-yellow-400"
                                }
                            `}
                        >

                            {s || "ALL"}

                        </button>

                    ))}

                </div>

                {/* LOADING */}

                {loading && (

                    <p className="text-gray-400">
                        Loading Orders...
                    </p>

                )}

                {/* EMPTY */}

                {!loading && orders.length === 0 && (

                    <p className="text-gray-400">
                        No Orders Found
                    </p>

                )}

                {/* ORDERS */}

                {!loading && orders.map((order) => (

                    <div

                        key={order.id}

                        className="
                            bg-white/5
                            border
                            border-yellow-500/20
                            rounded-3xl
                            p-7
                            mb-8
                        "

                    >

                        {/* HEADER */}

                        <div className="flex justify-between flex-wrap gap-6">

                            <div>

                                <h2 className="text-3xl font-bold">

                                    Order #{order.id}

                                </h2>

                                <p className="text-gray-400 mt-3">

                                    Ordered On :

                                    <br />

                                    {new Date(order.orderDate)
                                        .toLocaleString("en-IN", {

                                            dateStyle: "medium",

                                            timeStyle: "short"

                                        })}

                                </p>

                            </div>

                            <div className="text-right">

                                <h2 className="text-4xl font-black text-yellow-400">

                                    ₹{Math.round(order.totalAmount)
                                        .toLocaleString("en-IN")}

                                </h2>

                                <span
                                    className="
                                        inline-block
                                        mt-4
                                        px-5
                                        py-2
                                        rounded-full
                                        bg-yellow-500
                                        text-black
                                        font-bold
                                    "
                                >

                                    {order.status.replaceAll("_", " ")}

                                </span>

                            </div>

                        </div>

                        {/* PRODUCTS */}

                        <div className="mt-8">

                            <h3 className="text-xl font-bold mb-4">

                                Ordered Products

                            </h3>

                            {order.items?.map((item, index) => (

                                <div

                                    key={index}

                                    className="
                                        flex
                                        justify-between
                                        border-b
                                        border-white/10
                                        py-3
                                    "

                                >

                                    <div>

                                        <p className="font-semibold">

                                            {item.productName}

                                        </p>

                                        <p className="text-gray-400 text-sm">

                                            Qty : {item.quantity}

                                        </p>

                                    </div>

                                    {/* <div className="text-yellow-400 font-semibold">

                                        ₹{Math.round(item.price)
                                            .toLocaleString("en-IN")}

                                    </div> */}

                                </div>

                            ))}

                        </div>

                        {/* TRACKING */}

                        <div className="mt-8">

                            <h3 className="text-2xl font-bold mb-5">

                                Order Tracking

                            </h3>

                            <OrderTimeline
                                status={order.status}
                            />

                        </div>

                    </div>

                ))}

                {/* PAGINATION */}

                {totalPages > 1 && (

                    <div className="flex justify-center items-center gap-5 mt-10">

                        <button

                            disabled={page === 0}

                            onClick={() =>
                                setPage(page - 1)
                            }

                            className="
                                px-5
                                py-2
                                rounded-xl
                                bg-white/10
                                disabled:opacity-40
                            "

                        >

                            Previous

                        </button>

                        <span>

                            Page {page + 1} of {totalPages}

                        </span>

                        <button

                            disabled={page + 1 >= totalPages}

                            onClick={() =>
                                setPage(page + 1)
                            }

                            className="
                                px-5
                                py-2
                                rounded-xl
                                bg-white/10
                                disabled:opacity-40
                            "

                        >

                            Next

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}