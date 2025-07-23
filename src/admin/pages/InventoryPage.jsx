import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, Check, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedStock, setEditedStock] = useState({});
  const [updatedProductId, setUpdatedProductId] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = "http://localhost:5000"; // Adjust if needed

      const response = await axios.get(`${baseURL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      if (!Array.isArray(data)) {
        console.error("Expected array, got:", data);
        toast.error("Failed to load products (Invalid response)");
        return;
      }

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEditClick = (productId, currentStock) => {
    setEditingProductId(productId);
    setEditedStock({ ...editedStock, [productId]: currentStock });
  };

  const handleStockChange = (productId, newValue) => {
    setEditedStock({ ...editedStock, [productId]: newValue });
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setEditedStock({});
  };

  const handleConfirm = async (productId) => {
    try {
      const newStock = Number(editedStock[productId]);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        { stock: newStock },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Stock updated!");

      setUpdatedProductId(productId);
      setEditingProductId(null);
      setEditedStock({});
      fetchProducts();

      setTimeout(() => setUpdatedProductId(null), 2000);
    } catch (error) {
      toast.error("Failed to update stock");
      console.error("Error updating stock:", error);
    }
  };

  const getStockColor = (stock) => {
    if (stock === 0) return "bg-red-100 text-red-700";
    if (stock < 5) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Inventory Management
      </h1>
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium">{product.name}</td>

                <td className="p-3">
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      value={editedStock[product.id]}
                      onChange={(e) =>
                        handleStockChange(product.id, e.target.value)
                      }
                      className="border p-1 w-20 rounded"
                    />
                  ) : updatedProductId === product.id ? (
                    <AnimatePresence>
                      <motion.div
                        key="updated"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col gap-1"
                      >
                        <div className="flex items-center gap-1 text-green-600 font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Updated!
                        </div>
                        <motion.div
                          className="h-1 bg-green-400 rounded-full"
                          initial={{ width: "100%" }}
                          animate={{ width: 0 }}
                          transition={{ duration: 2, ease: "linear" }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStockColor(
                        product.stock
                      )}`}
                    >
                      {product.stock}
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {editingProductId === product.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleConfirm(product.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Check />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleEditClick(product.id, product.stock)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;