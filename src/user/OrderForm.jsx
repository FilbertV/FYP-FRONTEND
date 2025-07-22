import React, { useState } from "react";
import UserLayout from "./UserLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    product: "",
    width: "",
    widthUnit: "cm",
    height: "",
    heightUnit: "cm",
    quantity: 1,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Order submitted successfully!", {
      position: "top-center",
    });

    // Reset form
    setFormData({
      product: "",
      width: "",
      widthUnit: "cm",
      height: "",
      heightUnit: "cm",
      quantity: 1,
    });
  };

  return (
    <UserLayout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-violet-800 mb-6 text-center">Place an Order</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Selection */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Select Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl"
            >
              <option value="">-- Choose a product --</option>
              <option value="Modern Blinds">Modern Blinds</option>
              <option value="Elegant Curtain">Elegant Curtain</option>
              <option value="Classic Drapes">Classic Drapes</option>
            </select>
          </div>

          {/* Width & Height with Unit */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-gray-700">Width</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl"
                />
                <select
                  name="widthUnit"
                  value={formData.widthUnit}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-xl"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium text-gray-700">Height</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl"
                />
                <select
                  name="heightUnit"
                  value={formData.heightUnit}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-xl"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="w-full border border-gray-300 p-3 rounded-xl"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-violet-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-violet-800 transition"
            >
              Submit Order
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </UserLayout>
  );
}