import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext"; // Assuming you have a context or state management to get products

const BestSeller = () => {
  const { products } = useAppContext(); // Assuming you have a context or state management to get products
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

      <div>
        <ProductCard product={products[1]} />
      </div>
    </div>
  );
};

export default BestSeller;
