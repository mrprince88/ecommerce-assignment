import { useCartStore } from "src/store/cart";
import { Product } from "src/types";

const ProductCounter = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const products = useCartStore((state) => state.items);
  const cartProduct = products.find((p) => p.id === product.id);

  if (!cartProduct) {
    return (
      <button
        className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded"
        onClick={() => addItem(product)}
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="mt-3 flex justify-between items-center">
      <div className="flex items-center">
        <button
          className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          onClick={() => removeItem(product)}
        >
          -
        </button>
        <span className="px-3 py-1 bg-gray-200 text-xs font-bold uppercase rounded">
          {cartProduct?.quantity}
        </span>
        <button
          className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          onClick={() => addItem(product)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCounter;
