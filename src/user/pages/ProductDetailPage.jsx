import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productList from '../data/productList';
import Topbar from '../components/Topbar';
import { motion } from 'framer-motion';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productList.find((p) => p.id === parseInt(id));

  if (!product) return <div className="p-10 text-center">Product not found</div>;

  const recommended = productList.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-gray-800"
    >
      <Topbar />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="w-full md:w-1/2 h-96 object-cover rounded-xl"
          />
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold">RM {product.price}</p>
            <button
              onClick={() => navigate(`/order/${product.id}`)}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
            >
              Order Now
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommended.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/products/${item.id}`)}
                className="cursor-pointer rounded-xl border shadow-sm hover:shadow-lg p-4 transition"
              >
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
