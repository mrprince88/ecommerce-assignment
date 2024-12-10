import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

import ProductCounter from "src/components/ProductCounter";
import { useCartStore } from "src/store/cart";
import { CartItem as CartItemType } from "src/types";

const Cart = () => {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col h-full">
        <p>No items found!</p>
        <p>To add items</p>
        <Link to="/" className="bg-gray-800 text-white px-4 py-2 rounded">
          Go to home
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-5 gap-10 p-12">
      {/* <h1 className="text-3xl">Cart</h1> */}

      <div className="col-span-3">
        {items.map((v) => (
          <CartItem key={v.id} item={v} />
        ))}
      </div>

      <div className="col-span-2">
        <PriceCard />
      </div>
    </div>
  );
};

const PriceCard = () => {
  const items = useCartStore((state) => state.items);
  const clearItems = useCartStore((state) => state.clearItems);
  const navigate = useNavigate();
  const [isCodeValid, setIsCodeValid] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("http://localhost:9900/order/create", {
        items,
      });
      return data;
    },
    onSuccess: () => {
      navigate(`/order/confirmation`);
      toast.success("Order placed successfully");
      clearItems();
    },
  });

  const { mutateAsync: validateDiscountCode } = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const { data } = await axios.post("http://localhost:9900/validate/code", {
        code,
      });
      return data;
    },
    onSuccess: (data) => {
      setIsCodeValid(data.isValid);
      if (data.isValid) {
        toast.success("Discount applied successfully");
      } else {
        toast.error("Invalid discount code");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Invalid discount code");
    },
  });

  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="rounded-md border-gray-600 border-[1px] p-4 border-solid">
      <h1 className="text-3xl">ORDER SUMMARY</h1>
      <div className="flex justify-between items-center border-b border-gray-200 py-4">
        <h2 className="text-xl font-bold">Subtotal</h2>
        <h2 className="text-xl font-bold">${total}</h2>
      </div>

      <div className="flex justify-between items-center border-b border-gray-200 py-4">
        <h2 className="text-xl font-bold">Shipping</h2>
        <p className="text-gray-600">Free</p>
      </div>

      {isCodeValid && (
        <div className="flex justify-between items-center border-b border-gray-200 py-4">
          <h2 className="text-xl font-bold">Discount</h2>
          <p className="text-gray-600"> {`-$${total * 0.1}`}</p>
        </div>
      )}

      <div className="flex justify-between items-center border-b border-gray-200 py-4">
        <h2 className="text-xl font-bold">Total</h2>
        <h2 className="text-xl font-bold">
          ${total * (isCodeValid ? 0.9 : 1)}
        </h2>
      </div>

      {/* Discount Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validateDiscountCode({ code: e.currentTarget.discount.value });
        }}
      >
        <div className="flex justify-between items-center border-b border-gray-200 py-4">
          <input
            type="text"
            disabled={isCodeValid}
            name="discount"
            placeholder="Discount Code"
            className="border border-gray-300 px-4 py-2"
          />
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded disabled:bg-gray-300"
            disabled={isCodeValid}
          >
            Apply
          </button>
        </div>
      </form>

      <button
        className="bg-gray-800 text-white px-4 py-2 rounded mt-4"
        onClick={() => mutateAsync()}
      >
        Checkout
      </button>
    </div>
  );
};

const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div>
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="text-gray-600">
          ${item.price} X {item.quantity}
        </p>
      </div>
      <div>
        <ProductCounter product={item} />
      </div>
    </div>
  );
};

export default Cart;
