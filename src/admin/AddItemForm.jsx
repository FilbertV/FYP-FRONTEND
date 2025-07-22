import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AddItemForm = forwardRef(({ onItemAdded }, ref) => {
  const [form, setForm] = useState({
    name: '',
    material: '',
    width: '',
    widthUnit: 'cm',
    height: '',
    heightUnit: 'cm',
    quantity: ''
  });
  const [showForm, setShowForm] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useImperativeHandle(ref, () => ({
    resetForm: () => setForm({
      name: '',
      material: '',
      width: '',
      widthUnit: 'cm',
      height: '',
      heightUnit: 'cm',
      quantity: ''
    })
  }));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sizeFormatted = `${form.width} ${form.widthUnit} x ${form.height} ${form.heightUnit}`;

    const newItem = {
      name: form.name,
      material: form.material,
      size: sizeFormatted,
      quantity: parseInt(form.quantity)
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/inventory`, newItem);
      toast.success('✅ Item added!');
      onItemAdded();
      setForm({
        name: '',
        material: '',
        width: '',
        widthUnit: 'cm',
        height: '',
        heightUnit: 'cm',
        quantity: ''
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 1000);
    } catch {
      toast.error('❌ Failed to add item');
    }
  };

  return (
    <div className="mb-6">
      {/* Collapse Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-2"
      >
        {showForm ? <FaChevronUp /> : <FaChevronDown />} {showForm ? 'Hide Form' : 'Add New Item'}
      </button>

      {/* Success flash box */}
      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 transition-opacity animate-pulse">
          🎉 Item successfully added!
        </div>
      )}

      {/* Form Container */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${showForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">➕ Add New Inventory Item</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="🧾 Name"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="material"
              value={form.material}
              onChange={handleChange}
              required
              placeholder="🧵 Material"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Width and Height */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="width"
                value={form.width}
                onChange={handleChange}
                required
                placeholder="Width"
                className="w-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                name="widthUnit"
                value={form.widthUnit}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="cm">cm</option>
                <option value="m">m</option>
              </select>
              <span className="text-lg font-semibold">×</span>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                required
                placeholder="Height"
                className="w-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                name="heightUnit"
                value={form.heightUnit}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="cm">cm</option>
                <option value="m">m</option>
              </select>
            </div>

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              placeholder="🔢 Quantity"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition-all duration-200 shadow"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
});

export default AddItemForm;