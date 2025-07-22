import React from 'react';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
      <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
      <p className="mb-4">Are you sure you want to delete this product?</p>
      <div className="flex justify-center gap-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
);

export default ConfirmDeleteModal;
