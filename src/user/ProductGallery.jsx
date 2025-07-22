import React from "react";
import UserLayout from "./UserLayout";
import ProductCard from "./components/ProductCard";
import PageWrapper from "./components/PageWrapper";

const dummyProducts = [ /* ... */ ];

export default function ProductGallery() {
  return (
    <UserLayout>
      <PageWrapper>
        <h1 className="text-3xl font-bold text-violet-800 mb-6 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </PageWrapper>
    </UserLayout>
  );
}