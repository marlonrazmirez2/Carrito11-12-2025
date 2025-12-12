import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addProductToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      removeProductFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),

      getTotalPrice: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",  
    }
  )
);