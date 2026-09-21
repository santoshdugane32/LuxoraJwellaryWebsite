export default function OrderTrackingVertical({ status }) {

    const steps = [
        "PENDING",
        "CONFIRMED",
        "QUALITY_CHECK",
        "PACKED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED"
    ];

    const currentIndex = steps.indexOf(status);

    const isCancelled = status === "CANCELLED";
    const isReturnRequested = status === "RETURN_REQUESTED";
    const isReturned = status === "RETURNED";
    const isRefunded = status === "REFUNDED";

    return (

        <div className="mt-6">

            {/* CANCELLED */}

            {isCancelled ? (

                <div className="bg-red-500/10 border border-red-500 rounded-xl p-5">

                    <h3 className="text-red-400 text-xl font-bold">
                        ❌ Order Cancelled
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Your order has been cancelled.
                    </p>

                </div>

            ) : isReturnRequested ? (

                <div className="bg-orange-500/10 border border-orange-500 rounded-xl p-5">

                    <h3 className="text-orange-400 text-xl font-bold">
                        🔄 Return Requested
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Your return request is under review.
                    </p>

                </div>

            ) : isReturned ? (

                <div className="bg-gray-800 border border-gray-600 rounded-xl p-5">

                    <h3 className="text-gray-200 text-xl font-bold">
                        📦 Product Returned
                    </h3>

                    <p className="text-gray-400 mt-2">
                        The returned item has been received.
                    </p>

                </div>

            ) : isRefunded ? (

                <div className="bg-emerald-600/10 border border-emerald-500 rounded-xl p-5">

                    <h3 className="text-emerald-400 text-xl font-bold">
                        💰 Refund Completed
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Your refund has been processed successfully.
                    </p>

                </div>

            ) : (

                <div className="relative border-l-2 border-gray-700 pl-8 space-y-8">

                    {steps.map((step, index) => {

                        const completed = index <= currentIndex;
                        const active = index === currentIndex;

                        return (

                            <div
                                key={step}
                                className="relative"
                            >

                                {/* Circle */}

                                <div
                                    className={`
                                        absolute
                                        -left-[42px]
                                        top-1
                                        w-5
                                        h-5
                                        rounded-full
                                        border-2
                                        border-black
                                        ${completed
                                            ? "bg-green-500"
                                            : "bg-gray-600"}
                                        ${active
                                            ? "ring-4 ring-green-500/30"
                                            : ""}
                                    `}
                                />

                                {/* Status */}

                                <h3
                                    className={`
                                        text-lg
                                        font-bold
                                        ${completed
                                            ? "text-green-400"
                                            : "text-gray-500"}
                                    `}
                                >
                                    {step.replaceAll("_", " ")}
                                </h3>

                                {/* Description */}

                                <p className="text-sm text-gray-400 mt-1">

                                    {completed
                                        ? "Completed"
                                        : "Waiting..."}

                                </p>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

}