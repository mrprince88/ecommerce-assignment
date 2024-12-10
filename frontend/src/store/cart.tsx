import { create } from "zustand";
import { CartItem, Product } from "src/types";

interface CartState {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  clearItems: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => {
    set((state) => {
      const itemIndex = state.items.findIndex((i) => i.id === item.id);
      if (itemIndex === -1) {
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }
      const newItems = [...state.items];
      newItems[itemIndex].quantity += 1;
      return { items: newItems };
    });
  },
  removeItem: (item) => {
    set((state) => {
      const itemIndex = state.items.findIndex((i) => i.id === item.id);
      if (itemIndex === -1) {
        return { items: state.items };
      }
      const newItems = [...state.items];
      newItems[itemIndex].quantity -= 1;
      if (newItems[itemIndex].quantity === 0) {
        newItems.splice(itemIndex, 1);
      }
      return { items: newItems };
    });
  },
  clearItems: () => set({ items: [] }),
}));
