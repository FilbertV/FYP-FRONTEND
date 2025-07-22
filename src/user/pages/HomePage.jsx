import React from "react";
import Topbar from "../components/Topbar";
import ChatbotPopup from "../components/ChatbotPopup";

const HomePage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Topbar />

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[85vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/curtain.webp')" }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-3xl text-center text-white max-w-3xl shadow-xl">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Vistura</h1>
          <p className="text-xl mb-6">
            Premium Curtains, Roller & Rainbow Blinds to Elevate Your Home
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="/user/products"
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Browse Products
            </a>
            <a
              href="/user/order"
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Order Now
            </a>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-12">Our Best Sellers</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Elegant Curtains",
              image: "/images/curtain.webp",
              desc: "Stylish, flowing curtains to enhance any space with privacy and class.",
            },
            {
              title: "Rainbow Blinds",
              image: "/images/rainbowblinds.jpg",
              desc: "Modern dual-layer blinds with adjustable light control and chic design.",
            },
            {
              title: "Roller Blinds",
              image: "/images/rollerblinds.jpg",
              desc: "Minimalist and sleek blinds for functional, clean window solutions.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Use our AI assistant to get tailored recommendations — from measuring your windows to picking the perfect fabric and color.
        </p>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              text: "Vistura's curtains transformed my living room. The quality is superb and service was fast!",
              author: "Sarah L.",
            },
            {
              text: "Love the rainbow blinds! Super functional and they look beautiful in our new office.",
              author: "Adrian T.",
            },
            {
              text: "Fast ordering, perfect measurements, and sleek roller blinds. 10/10!",
              author: "Jessica W.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="italic">"{testimonial.text}"</p>
              <h4 className="mt-4 font-semibold text-blue-600">— {testimonial.author}</h4>
            </div>
          ))}
        </div>
      </section>
      
      <ChatbotPopup />
    </div>
  );
};

export default HomePage;