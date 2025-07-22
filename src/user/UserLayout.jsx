import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-violet-50 to-white">
      <Navbar />
      <main className="flex-grow px-6 py-8">{children}</main>
      <Footer />
    </div>
  );
}