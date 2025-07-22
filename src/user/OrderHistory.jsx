import React from "react";
import UserLayout from "./UserLayout";

export default function OrderHistory() {
  const dummyOrders = [
    {
      id: 1,
      product: "Modern Blinds",
      size: "150cm x 200cm",
      quantity: 2,
      date: "2025-07-10",
      status: "Processed",
    },
    {
      id: 2,
      product: "Elegant Curtain",
      size: "120cm x 220cm",
      quantity: 1,
      date: "2025-07-12",
      status: "Shipped",
    },
  ];

  return (
    <UserLayout>
      <h1 className="text-3xl font-bold text-violet-800 mb-6 text-center">Order History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-violet-100 text-violet-800">
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Size</th>
              <th className="text-left px-4 py-3">Quantity</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.product}</td>
                <td className="px-4 py-3">{order.size}</td>
                <td className="px-4 py-3">{order.quantity}</td>
                <td className="px-4 py-3">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UserLayout>
  );
}