import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import ProductCounter from "src/components/ProductCounter";
import { Product } from "src/types";

const Products = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:9900/products");
      return data;
    },
  });

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl py-4">Products</h1>
      <ul className="grid grid-cols-3 gap-4">
        {data?.map((product: Product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-56 object-cover object-center"
        src={product.image}
        alt={product.name}
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        {/* <p className="mt-2 text-gray-600">{product.description}</p> */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-600">
            ${product.price}
          </span>
          <ProductCounter product={product} />
        </div>
      </div>
    </div>
  );
};

export default Products;
