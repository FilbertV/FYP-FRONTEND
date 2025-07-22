import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { productList } from '../../user/data/productList';
import ProductEditModal from '../components/ProductEditModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get('/api/admin/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!Array.isArray(data)) {
        console.error('Unexpected response:', data);
        return;
      }

      const merged = data.map((prod) => {
        const match = productList.find(
          (p) => p.name.trim().toLowerCase() === prod.name.trim().toLowerCase()
        );

        let image = match?.image || 'curtain.webp';

        if (prod.name.trim().toLowerCase() === 'curtains') {
          image = 'curtain.webp';
        }

        return {
          ...prod,
          image,
        };
      });

      setProducts(merged);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleEditSubmit = async (updatedProduct) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `/api/admin/products/${updatedProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === updatedProduct._id ? { ...p, ...updatedProduct } : p
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Manager</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300"
          >
            <img
              src={`/images/${product.image}`}
              alt={product.name}
              className="h-48 w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.jpg';
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                {product.description}
              </p>
              <p className="text-sm font-medium text-gray-800 mb-2">
                Stock: {product.stock}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowEditModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditSubmit}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedProduct && (
        <ConfirmDeleteModal
          productName={selectedProduct.name}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(selectedProduct._id)}
        />
      )}
    </div>
  );
};

export default ProductManager;
