import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/common/store/cart-store";
import type { Product } from "@/common/types";

interface CartItemProps {
  item: Product & { quantity: number };
}

export const CartItem = ({ item }: CartItemProps) => {
  const { increaseQuantity, decreaseQuantity, removeProductFromCart } =
    useCartStore();

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-white">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-contain rounded-lg"
      />

      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
        <p className="text-gray-600 text-sm">S/. {item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition"
            disabled={item.quantity === 1}
          >
            <Minus size={16} />
          </button>

          <span className="w-8 text-center font-semibold">{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-bold text-lg">
          S/. {(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeProductFromCart(item.id)}
          className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};