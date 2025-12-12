import { Home, ShoppingCart, Eye, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart-store";
import { useState } from "react";

export const Header = () => {
  const { cart, getTotalItems, removeProductFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const [openCart, setOpenCart] = useState<boolean>(false);
  const totalItems = getTotalItems();

  return (
    <div className="relative flex px-4 items-center justify-between h-16 bg-red-500 text-white">
      <Link to={"/"}>
        <Home />
      </Link>

      <div className="flex items-center gap-4">
        <Link to={"/products"} className="hover:underline">
          Tienda
        </Link>
        <button
          className="cursor-pointer relative"
          onClick={() => setOpenCart(!openCart)}
        >
          <ShoppingCart />
          {totalItems > 0 && (
            <label className="bg-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2 font-semibold pointer-events-none">
              {totalItems}
            </label>
          )}
        </button>
      </div>

      {openCart && (
        <div className="absolute right-5 top-14 w-[380px] bg-white text-black border border-gray-950/30 h-fit rounded-lg flex flex-col gap-4 p-4 shadow-lg z-50">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              El carrito está vacío
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                {cart.map((product) => (
                  <div key={product.id} className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-16 w-16 rounded-lg object-contain flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold line-clamp-2 mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm font-bold text-red-500 mb-2">
                        S/. {(product.price * product.quantity).toFixed(2)}
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-gray-100 rounded">
                          <button
                            onClick={() => decreaseQuantity(product.id)}
                            className="p-1 hover:bg-gray-200 rounded transition"
                            disabled={product.quantity === 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(product.id)}
                            className="p-1 hover:bg-gray-200 rounded transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeProductFromCart(product.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                          title="Eliminar producto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg text-red-500">
                    S/. {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setOpenCart(false)}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <Eye size={18} />
                  Ver carrito completo
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};