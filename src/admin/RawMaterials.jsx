import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RawMaterials = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/inventory/materials`)
      .then(res => setMaterials(res.data))
      .catch(() => toast.error('❌ Failed to load materials'));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">📦 Raw Material Overview</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Unit</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="p-2 border text-center">{m.id}</td>
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border text-right">{m.quantity}</td>
              <td className="p-2 border">{m.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RawMaterials;