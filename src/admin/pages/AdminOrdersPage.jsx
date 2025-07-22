import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setPopupMessage('Order deleted successfully');
      setShowPopup(true);
      fetchOrders();
      setTimeout(() => setShowPopup(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.patch(`/api/orders/${id}`);
      setPopupMessage('Order marked as complete');
      setShowPopup(true);
      fetchOrders();
      setTimeout(() => setShowPopup(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return order.completed;
    if (filter === 'pending') return !order.completed;
    return true;
  });

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">All Orders</h1>

        <div className="mb-4 flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <table className="w-full table-auto border border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Size (W x H)</th>
              <th className="border px-4 py-2">Notes</th>
              <th className="border px-4 py-2">Completed</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.name}</td>
                <td className="border px-4 py-2">{order.phone}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2">{order.product}</td>
                <td className="border px-4 py-2">{order.width} x {order.height}</td>
                <td className="border px-4 py-2">{order.notes}</td>
                <td className="border px-4 py-2">
                  {order.completed ? '✅' : '❌'}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    {!order.completed && (
                      <button
                        onClick={() => handleComplete(order.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showPopup && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
            {popupMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;