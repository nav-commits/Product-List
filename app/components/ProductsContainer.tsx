"use client";
import { Product } from "@/types/data.types";
import { Card } from "./Card";
import logo from "@/public/icons/icon-add-to-cart.svg";
import Image from "next/image";
import { useState } from "react";
import increase from "@/public/icons/icon-increment-quantity.svg";
import decrease from "@/public/icons/icon-decrement-quantity.svg";
import emptyCart from "@/public/icons/illustration-empty-cart.svg";
import { X } from "lucide-react";

interface ProductData {
  products: Product[];
}

export const ProductsContainer: React.FC<ProductData> = ({ products }) => {
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  const increaseCounter = (id: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseCounter = (id: number) => {
    setCounts((prev) => {
      const newValue = (prev[id] || 0) - 1;
      if (newValue <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newValue };
    });
  };

  const removeFromCart = (id: number) => {
    setCounts((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  // Calculate total cart price
  const totalPrice = Object.entries(counts).reduce((acc, [id, count]) => {
    const product = products.find((p) => p.id === Number(id));
    return acc + (product ? product.price * count : 0);
  }, 0);

  return (
    <div className="px-10 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Products grid */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 text-[hsl(159,69%,38%)]">
            Desserts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.map((item) => {
              const count = counts[item.id] || 0;
              const inCart = count > 0;
              return (
                <Card
                  key={item.id}
                  image={item.image}
                  title={item.name}
                  subtitle={item.type}
                  price={item.price}
                  overlayButton
                  button={
                    <button
                      onClick={() => {
                        if (!inCart) increaseCounter(item.id);
                      }}
                      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-full transition cursor-pointer 
                        ${
                          inCart
                            ? "bg-red-800 text-white"
                            : "bg-white border border-red-800 hover:bg-red-50"
                        }`}
                    >
                      {inCart ? (
                        <div className="flex items-center gap-6">
                          {/* Decrease */}
                          <Image
                            src={decrease}
                            alt="Decrease"
                            className="w-5 h-5 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              decreaseCounter(item.id);
                            }}
                          />
                          {/* Count */}
                          <span>{count}</span>
                          {/* Increase */}
                          <Image
                            src={increase}
                            alt="Increase"
                            className="w-5 h-5 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              increaseCounter(item.id);
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          <Image
                            src={logo}
                            alt="Cart Icon"
                            className="w-5 h-5"
                          />
                          Add to Cart
                        </>
                      )}
                    </button>
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Cart section */}
        <div className="flex flex-col gap-4">
          <Card
            title={`Your Cart (${Object.values(counts).reduce(
              (a, b) => a + b,
              0
            )})`}
            className="p-4 w-120 bg-white"
          >
            {Object.keys(counts).length > 0 ? (
              <div>
                {Object.entries(counts).map(([id, count]) => {
                  const product = products.find((p) => p.id === Number(id));
                  if (!product) return null;
                  const itemTotal = product.price * count;

                  return (
                    <div
                      key={id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {count} × ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold">${itemTotal.toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(Number(id))}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <h3 className="mt-4 font-bold text-lg">
                  Total: ${totalPrice.toFixed(2)}
                </h3>

                <button className="mt-4 bg-red-800 text-white px-4 py-2 rounded-2xl hover:bg-red-600 cursor-pointer">
                  Confirm Order
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <Image src={emptyCart} alt="Cart Icon" className="w-50 h-50" />
                <p className="mt-2">Your items will appear</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
