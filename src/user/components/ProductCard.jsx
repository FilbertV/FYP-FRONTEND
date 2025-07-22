import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.material}</p>
        <p className="text-sm text-gray-500 mt-2">Size: {product.size}</p>
        <button className="mt-3 bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800">
          Order Now
        </button>
      </div>
    </div>
  );
}