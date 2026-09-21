import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminNavbar from "./AdminNavbar";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const res = await api.get("/api/admin/orders");

      console.log("Orders:", res.data);

      setOrders(res.data);

    } catch (error) {

      console.log(error);

      if (error.response?.status === 401) {
        alert("Please login again.");
      }

      if (error.response?.status === 403) {
        alert("Only Admin can access this page.");
      }
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await api.put(`/api/admin/orders/${id}/${status}`);

      alert("Order status updated");

      loadOrders();

    } catch (error) {

      console.log(error);
      alert("Failed to update order.");

    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-5xl font-bold mb-10">
          Admin Orders
        </h1>

        {orders.length === 0 ? (

          <div className="text-center text-gray-400 text-xl mt-20">
            No Orders Found
          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
            >

              <h2 className="text-2xl font-bold mb-2">
                Order #{order.id}
              </h2>

              <p className="mb-2">
                <b>User:</b> {order.userEmail}
              </p>

              <p className="mb-2">
                <b>Total:</b> ₹{Math.round(order.totalAmount).toLocaleString("en-IN")}
              </p>

              <p className="mb-5">
                <b>Status:</b>

                <span className="text-yellow-400 ml-2">
                  {order.status}
                </span>

              </p>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order.id, e.target.value)
                }
                className="
        bg-black
        border
        border-yellow-500
        px-5
        py-3
        rounded-xl
        text-white
    "
              >

                <option value="PENDING">
                  Pending
                </option>

                <option value="CONFIRMED">
                  Confirmed
                </option>

                <option value="QUALITY_CHECK">
                  Quality Check
                </option>

                <option value="PACKED">
                  Packed
                </option>

                <option value="SHIPPED">
                  Shipped
                </option>

                <option value="OUT_FOR_DELIVERY">
                  Out For Delivery
                </option>

                <option value="DELIVERED">
                  Delivered
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>

                <option value="RETURN_REQUESTED">
                  Return Requested
                </option>

                <option value="RETURNED">
                  Returned
                </option>

                <option value="REFUNDED">
                  Refunded
                </option>

              </select>
            </div>

          ))

        )}

      </div>

    </div>

  );
}