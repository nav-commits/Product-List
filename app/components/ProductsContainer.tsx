import { Product } from "@/types/data.types";
import { Card } from "./Card";

interface ProductData {
  products: Product[];
}

export const ProductsContainer: React.FC<ProductData> = ({ products }) => {
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
                  <button className="bg-red-800 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-red-800 transition text-sm sm:text-base">
                    Add to Cart
                  </button>
                }
              />
            ))}
          </div>
        </div>
        {/* Cart section */}
        <div className="flex flex-col gap-4">
          <Card title="Your Cart (0)" className="p-4 w-120 bg-white">
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
