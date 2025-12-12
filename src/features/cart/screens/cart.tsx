import { useCartStore } from "@/common/store/cart-store";
import { CartItem } from "../components/cart-item";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBag size={80} className="text-gray-300" />
        <h2 className="text-2xl font-semibold text-gray-600">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500">
          Agrega productos para comenzar a comprar
        </p>
        <Link
          to="/products"
          className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mi Carrito</h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
          <Trash2 size={18} />
          Vaciar carrito
        </button>
      </div>

      <div className="grid gap-4 mb-6">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-gray-100 p-6 rounded-lg sticky bottom-0">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Total de items:</span>
            <span>{getTotalItems()}</span>
          </div>

          <div className="flex justify-between text-2xl font-bold border-t pt-3">
            <span>Total a pagar:</span>
            <span className="text-red-500">S/. {getTotalPrice().toFixed(2)}</span>
          </div>

          <button className="w-full mt-4 px-6 py-4 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition">
            Proceder al pago
          </button>

          <Link
            to="/products"
            className="text-center text-red-500 hover:underline"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}