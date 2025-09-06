"use client";
import { Product } from "@/types/data.types";
import { Card } from "./Card";
import logo from "@/public/icons/icon-add-to-cart.svg";
import Image from "next/image";
import { useState } from "react";

interface ProductData {
  products: Product[];
}

export const ProductsContainer: React.FC<ProductData> = ({ products }) => {
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const updateCounter = (index: number) => {
    setCounts((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };
  return (
    <div className="px-10 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Products grid */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 text-[hsl(159,69%,38%)]">
            Desserts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.map((item, i) => (
              <Card
                key={i}
                image={item.image}
                title={item.name}
                subtitle={item.type}
                price={item.price}
                overlayButton
                button={
                  <button
                    onClick={() => updateCounter(i)}
                    className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold 
                               bg-white border border-red-800 rounded-full transition 
                               cursor-pointer hover:bg-red-50"
                  >
                    <Image src={logo} alt="Cart Icon" className="w-5 h-5" />
                    {counts[i] && counts[i] > 0 ? counts[i] : "Add to Cart"}
                  </button>
                }
              />
            ))}
          </div>
        </div>

        {/* Cart section */}
        <div className="flex flex-col gap-4">
          <Card title={`Your Cart`} className="p-4 w-120 bg-white">
            <div className="h-40 w-80 w-full bg-gray-200 flex items-center justify-center text-gray-500">
              Cart Image
            </div>
            <h3 className="mt-4 font-semibold text-lg">Your Cart</h3>
            <p className="text-gray-600 mt-2">Items in your cart</p>
            <button className="mt-4 bg-red-800 text-white px-4 py-2 rounded-2xl hover:bg-red-600 cursor-pointer">
              Confirm Order
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
