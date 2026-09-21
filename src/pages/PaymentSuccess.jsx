import { CheckCircle, Package, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {

    const navigate = useNavigate();
    const location = useLocation();

    const {
        orderId,
        amount,
        paymentId,
        paymentMethod,
        paymentDate,
        productName,
        quantity
    } = location.state || {};

    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10">

            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10">

                {/* Success Icon */}

                <div className="flex justify-center">

                    <CheckCircle
                        size={90}
                        className="text-green-500"
                    />

                </div>

                {/* Heading */}

                <h1 className="text-5xl font-bold text-center text-green-600 mt-5">
                    Payment Successful
                </h1>

                <p className="text-center text-gray-500 text-lg mt-3">
                    Thank you for shopping with
                    <span className="font-bold text-gray-700">
                        {" "}LUXORA
                    </span>.
                </p>

                <p className="text-center text-gray-500 mt-2">
                    Your payment has been received successfully.
                </p>

                {/* Details */}

                <div className="mt-10 border rounded-2xl overflow-hidden">

                    <div className="flex justify-between p-5 border-b">
                        <span className="font-semibold text-lg">Order ID</span>
                        <span className="font-bold">#{orderId}</span>
                    </div>

                    <div className="flex justify-between p-5 border-b">
                        <span className="font-semibold text-lg">Payment Status</span>
                        <span className="font-bold text-green-600">
                            SUCCESS
                        </span>
                    </div>

                    <div className="flex justify-between p-5 border-b">
                        <span className="font-semibold text-lg">Amount Paid</span>
                        <span className="font-bold">
                            ₹{amount?.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="flex justify-between p-5 border-b">
                        <span className="font-semibold text-lg">Payment Method</span>
                        <span>{paymentMethod || "Razorpay"}</span>
                    </div>

                    <div className="flex justify-between p-5 border-b">
                        <span className="font-semibold text-lg">Transaction ID</span>

                        <span className="text-sm break-all">
                            {paymentId}
                        </span>
                    </div>

                    <div className="flex justify-between p-5 border-b">
                        <span className="font-semibold text-lg">Date</span>
                        <span>{paymentDate}</span>
                    </div>

                    <div className="flex justify-between p-5">
                        <span className="font-semibold text-lg">
                            Estimated Delivery
                        </span>

                        <span className="text-green-600 font-semibold">
                            3–5 Days
                        </span>
                    </div>

                </div>

                {/* Purchased Item */}

                <div className="mt-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Items Purchased
                    </h2>

                    <div className="flex justify-between items-center border rounded-2xl p-5">

                        <div>

                            <h3 className="font-bold text-lg">
                                {productName}
                            </h3>

                            <p className="text-gray-500">
                                Qty : {quantity}
                            </p>

                        </div>

                        <span className="font-bold text-xl">
                            ₹{amount?.toLocaleString("en-IN")}
                        </span>

                    </div>

                </div>

                {/* Buttons */}

                <div className="grid grid-cols-2 gap-5 mt-10">

                    <button

                        onClick={() => navigate("/my-orders")}

                        className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-xl transition"

                    >

                        <Package size={22} />

                        View My Orders

                    </button>

                    <button

                        onClick={() => navigate("/products")}

                        className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition"

                    >

                        <ShoppingBag size={22} />

                        Continue Shopping

                    </button>

                </div>

            </div>

        </div>

    );

}