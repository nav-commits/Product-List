import {ProductsContainer} from "./components/ProductsContainer";
import { products } from "@/data/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50 py-8 px-8">
     <ProductsContainer products={products}/>
    </div>
  );
}
