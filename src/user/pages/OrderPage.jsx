import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productList from '../data/productList';
import Topbar from '../components/Topbar';
import { motion } from 'framer-motion';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productList.find((p) => p.id === parseInt(id));
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    width: '',
    height: '',
    notes: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      product: product.name,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/my-orders');
        }, 2000);
      } else {
        alert('Failed to submit order.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  };

  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white text-gray-800"
    >
      <Topbar />
      <div className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Place Your Order</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl"
          />
          <div>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="mt-2">{product.description}</p>
            <p className="mt-4 font-bold text-xl">RM {product.price}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            required
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Address"
            required
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="width"
              placeholder="Width (cm)"
              required
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />
            <input
              name="height"
              placeholder="Height (cm)"
              required
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />
          </div>
          <textarea
            name="notes"
            placeholder="Additional Notes"
            rows="4"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            Submit Order
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl px-6 py-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Successful!</h2>
            <p className="text-gray-600">Thankyou for Ordering!</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OrderPage;