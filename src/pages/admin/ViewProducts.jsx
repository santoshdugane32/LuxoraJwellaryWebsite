import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ViewProducts() {

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const response = await api.get("/api/products");

            setProducts(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete this product?")) return;

        try {

            await api.delete(`/api/products/${id}`);

            alert("✅ Product Deleted");

            loadProducts();

        } catch (error) {

            console.log(error);

            alert(error.response?.data || "Delete Failed");

        }

    };

    const updateProduct = async () => {

        try {

            await api.put(
                `/api/products/${editingProduct.id}`,
                editingProduct
            );

            alert("✅ Product Updated");

            setShowModal(false);

            loadProducts();

        } catch (error) {

            console.log(error);

            alert(error.response?.data || "Update Failed");

        }

    };

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-5xl font-bold mb-10">
                Manage Products
            </h1>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-zinc-900">

                        <tr>

                            <th className="p-4">Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Weight</th>
                            <th>Purity</th>
                            <th>Making %</th>
                            <th>Stock</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr
                                key={product.id}
                                className="border-b border-zinc-800 text-center"
                            >

                                <td className="p-3">

                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.src =
                                                "https://via.placeholder.com/80?text=No+Image";
                                        }}
                                        className="w-20 h-20 rounded-lg object-cover mx-auto"
                                    />

                                </td>

                                <td>{product.name}</td>

                                <td>{product.category}</td>

                                <td>{product.weightInGrams} g</td>

                                <td>{product.purity} K</td>

                                <td>{product.makingChargePercent}%</td>

                                <td>{product.stock}</td>

                                <td>

                                    <button
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setShowModal(true);
                                        }}
                                        className="bg-blue-600 px-4 py-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="bg-red-600 px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {showModal && editingProduct && (

                <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

                    <div className="bg-white text-black p-8 rounded-xl w-[500px]">

                        <h2 className="text-3xl font-bold mb-5">
                            Edit Product
                        </h2>

                        <input
                            className="border p-3 w-full mb-3"
                            value={editingProduct.name}
                            placeholder="Name"
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    name: e.target.value,
                                })
                            }
                        />

                        <input
                            className="border p-3 w-full mb-3"
                            value={editingProduct.category}
                            placeholder="Category"
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    category: e.target.value,
                                })
                            }
                        />

                        <input
                            className="border p-3 w-full mb-3"
                            value={editingProduct.imageUrl}
                            placeholder="Image URL"
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    imageUrl: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            className="border p-3 w-full mb-3"
                            value={editingProduct.weightInGrams}
                            placeholder="Weight"
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    weightInGrams: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            className="border p-3 w-full mb-3"
                            value={editingProduct.purity}
                            placeholder="Purity"
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    purity: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            className="border p-3 w-full mb-3"
                            value={editingProduct.makingChargePercent}
                            placeholder="Making Charge %"
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    makingChargePercent: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            className="border p-3 w-full mb-5"
                            value={editingProduct.stock}
                            placeholder="Stock"
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    stock: e.target.value,
                                })
                            }
                        />

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-5 py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={updateProduct}
                                className="bg-green-600 text-white px-5 py-2 rounded"
                            >
                                Update
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}