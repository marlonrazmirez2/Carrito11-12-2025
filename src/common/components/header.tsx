import { Home, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart-store";

export const Header = () => {
  const { getTotalItems } = useCartStore();
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
        <Link to={"/cart"} className="cursor-pointer relative">
          <ShoppingCart />
          {totalItems > 0 && (
            <label className="bg-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2 font-semibold cursor-pointer">
              {totalItems}
            </label>
          )}
        </Link>
      </div>
    </div>
  );
};