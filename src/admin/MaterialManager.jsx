import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function MaterialManager() {
  const [materials, setMaterials] = useState([]);
  const [edited, setEdited] = useState({});
  const [newMaterial, setNewMaterial] = useState({ name: '', quantity: '', unit: 'cm' });
  const [searchQuery, setSearchQuery] = useState('');

  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchMaterials = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/materials`)
      .then(res => {
        setMaterials(res.data);
        const initEdit = {};
        res.data.forEach(m => {
          initEdit[m.id] = { name: m.name, quantity: m.quantity, unit: m.unit };
        });
        setEdited(initEdit);
      })
      .catch(() => toast.error('❌ Failed to load materials'));
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleEditChange = (id, field, value) => {
    setEdited(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleUpdate = (id) => {
    const { name, quantity, unit } = edited[id];
    if (!name.trim() || isNaN(quantity) || quantity < 0 || !unit.trim()) {
      toast.error('⚠️ Invalid input');
      return;
    }

    axios.put(`${process.env.REACT_APP_API_URL}/api/materials/${id}`, { name, quantity, unit })
      .then(() => {
        toast.success('✅ Material updated');
        fetchMaterials();
      })
      .catch(() => toast.error('❌ Update failed'));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;

    axios.delete(`${process.env.REACT_APP_API_URL}/api/materials/${id}`)
      .then(() => {
        toast.success('🗑️ Material deleted');
        fetchMaterials();
      })
      .catch(() => toast.error('❌ Delete failed'));
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    const { name, quantity, unit } = newMaterial;

    if (!name.trim() || isNaN(quantity) || quantity <= 0 || !unit.trim()) {
      toast.error('⚠️ Please enter valid material details');
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/api/materials`, { name, quantity, unit })
      .then(() => {
        toast.success('✅ Material added');
        setNewMaterial({ name: '', quantity: '', unit: 'cm' });
        fetchMaterials();
      })
      .catch(() => toast.error('❌ Failed to add material'));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedMaterials = () => {
    return [...materials]
      .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">🧰 Material Manager</h2>

      {/* Add Material Form */}
      <form onSubmit={handleAddMaterial} className="bg-white shadow rounded p-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Material Name"
          value={newMaterial.name}
          onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newMaterial.quantity}
          onChange={(e) => setNewMaterial({ ...newMaterial, quantity: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={newMaterial.unit}
          onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
          className="border p-2 rounded w-full md:w-1/6"
        >
          <option value="cm">cm</option>
          <option value="m">m</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 w-full md:w-1/6"
        >
          Add
        </button>
      </form>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search materials..."
        className="p-2 border rounded w-full md:w-1/3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Table */}
      <table className="w-full text-sm border rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort('name')}>
              Material {sortField === 'name' && (sortDirection === 'asc' ? '🔼' : '🔽')}
            </th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort('quantity')}>
              Quantity {sortField === 'quantity' && (sortDirection === 'asc' ? '🔼' : '🔽')}
            </th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {getSortedMaterials().map(mat => (
            <tr key={mat.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                <input
                  type="text"
                  value={edited[mat.id]?.name || ''}
                  onChange={e => handleEditChange(mat.id, 'name', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={edited[mat.id]?.quantity || ''}
                  onChange={e => handleEditChange(mat.id, 'quantity', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="p-2 border">
                <select
                  value={edited[mat.id]?.unit || 'cm'}
                  onChange={e => handleEditChange(mat.id, 'unit', e.target.value)}
                  className="w-full p-1 border rounded"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </td>
              <td className="p-2 border text-center space-x-2">
                <button
                  onClick={() => handleUpdate(mat.id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(mat.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MaterialManager;