import React from 'react';
import productList from '../data/productList';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import PageTransitionWrapper from '../components/PageTransitionWrapper';

const ProductPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-white text-gray-800">
        <Topbar />
        <div className="px-6 py-10">
          <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {productList.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 border"
              >
                <img
                  src={`/images/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="mt-2 font-bold text-lg">RM {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default ProductPage;