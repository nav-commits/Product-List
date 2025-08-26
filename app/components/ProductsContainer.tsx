import { Product } from "@/types/data.types";
import Image from "next/image";

interface ProductData {
  products: Product[];
}

export const ProductsContainer: React.FC<ProductData> = ({ products }) => {
  return (
    <div className="px-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Products section */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 text-[hsl(159, 69%, 38%)]">
            Desserts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.map((item, i) => (
              <div
                key={i}
                className="rounded-lg flex flex-col relative"
              >
                {/* Image with button overlay */}
                <div className="relative w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                  <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition text-sm sm:text-base">
                    Add to Cart
                  </button>
                </div>

                {/* Content below image */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="mt-1 text-gray-600">{item.type}</p>
                  </div>
                  <p className="mt-2 font-bold text-red-600">$ {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart section (unchanged) */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg p-4 shadow-md flex flex-col bg-white">
            <h1 className="text-2xl font-bold mb-4 text-red-800">
              Your Cart (0)
            </h1>
            <div className="h-40  w-90 bg-gray-200 flex items-center justify-center text-gray-500">
              Cart Image
            </div>
            <h3 className="mt-4 font-semibold text-lg">Your Cart</h3>
            <p className="text-gray-600 mt-2">Items in your cart</p>
            <button className="mt-4 bg-red-800 text-white px-4 py-2 rounded-2xl hover:bg-red-600 cursor-pointer">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
