import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditItemForm = ({ item, onClose, onUpdated }) => {
  const parseSize = (sizeString) => {
    const match = sizeString.match(/(\\d+)\\s*(cm|m)\\s*x\\s*(\\d+)\\s*(cm|m)/i);
    return match
      ? {
          width: match[1],
          widthUnit: match[2],
          height: match[3],
          heightUnit: match[4],
        }
      : {
          width: '',
          widthUnit: 'cm',
          height: '',
          heightUnit: 'cm',
        };
  };

  const initialSize = parseSize(item.size);

  const [form, setForm] = useState({
    ...item,
    width: initialSize.width,
    widthUnit: initialSize.widthUnit,
    height: initialSize.height,
    heightUnit: initialSize.heightUnit,
  });

  useEffect(() => {
    const sizeParsed = parseSize(item.size);
    setForm({
      ...item,
      width: sizeParsed.width,
      widthUnit: sizeParsed.widthUnit,
      height: sizeParsed.height,
      heightUnit: sizeParsed.heightUnit,
    });
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sizeFormatted = `${form.width} ${form.widthUnit} x ${form.height} ${form.heightUnit}`;
    const updatedItem = {
      name: form.name,
      material: form.material,
      size: sizeFormatted,
      quantity: parseInt(form.quantity)
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/inventory/${item.id}`, updatedItem);
      toast.success('✏️ Item updated!');
      onUpdated();
      onClose();
    } catch {
      toast.error('❌ Failed to update item');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg border animate-slide-up"
      >
        <h2 className="text-xl font-semibold mb-4">✏️ Edit Item</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="🧾 Name"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            name="material"
            value={form.material}
            onChange={handleChange}
            required
            placeholder="🧵 Material"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* Width & Height Inputs */}
          <div className="flex items-center gap-2 col-span-2">
            <input
              type="number"
              name="width"
              value={form.width}
              onChange={handleChange}
              required
              placeholder="Width"
              className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <select
              name="widthUnit"
              value={form.widthUnit}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <select
              name="heightUnit"
              value={form.heightUnit}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg shadow"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItemForm;