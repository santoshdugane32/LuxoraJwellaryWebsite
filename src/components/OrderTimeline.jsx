export default function OrderTimeline({ status }) {

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
    const isReturned = status === "RETURNED";
    const isRefunded = status === "REFUNDED";
    const isReturnRequested = status === "RETURN_REQUESTED";

    return (

        <div className="mt-6">

            {isCancelled ? (

                <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">

                    <h3 className="text-red-400 text-lg font-bold">
                        ❌ Order Cancelled
                    </h3>

                </div>

            ) : isReturnRequested ? (

                <div className="bg-orange-500/10 border border-orange-500 rounded-xl p-4">

                    <h3 className="text-orange-400 text-lg font-bold">
                        🔄 Return Requested
                    </h3>

                </div>

            ) : isReturned ? (

                <div className="bg-gray-700 rounded-xl p-4">

                    <h3 className="text-gray-200 text-lg font-bold">
                        📦 Product Returned
                    </h3>

                </div>

            ) : isRefunded ? (

                <div className="bg-emerald-600/20 border border-emerald-500 rounded-xl p-4">

                    <h3 className="text-emerald-400 text-lg font-bold">
                        💰 Refund Completed
                    </h3>

                </div>

            ) : (

                <div className="flex flex-wrap items-center gap-3">

                    {steps.map((step, index) => {

                        const completed = index <= currentIndex;

                        return (

                            <div
                                key={step}
                                className="flex items-center gap-2"
                            >

                                {/* Circle */}

                                <div
                                    className={`
                                        w-5 h-5 rounded-full
                                        ${completed
                                            ? "bg-green-500"
                                            : "bg-gray-600"}
                                    `}
                                />

                                {/* Label */}

                                <span
                                    className={`
                                        text-sm font-medium
                                        ${completed
                                            ? "text-green-400"
                                            : "text-gray-500"}
                                    `}
                                >
                                    {step.replaceAll("_", " ")}
                                </span>

                                {/* Line */}

                                {index !== steps.length - 1 && (

                                    <div
                                        className={`
                                            w-8 h-[2px]
                                            ${completed
                                                ? "bg-green-500"
                                                : "bg-gray-700"}
                                        `}
                                    />

                                )}

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

}