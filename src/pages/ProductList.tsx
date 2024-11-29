// ProductList.tsx

import { useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeProvider";
import CartModal from "./CartModal";
import ProductCard, { ProductCardProps } from "./ProductCard";
import ProductDetails from "./ProductDetails";

type Product = ProductCardProps["product"];

// Export the CartItem interface
export interface CartItem extends Product {
  quantity: number;
}

const ProductList = ({ products }: { products: ProductCardProps["product"][] }) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]); // State now holds CartItem
  const [isOpenCartModel, setIsOpenCartModel] = useState(false);
  const { darkMode } = useTheme();

  const addToCart = (product: ProductCardProps["product"]) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
  
      if (existingProduct) {
        // If product is already in the cart, increase the quantity
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save the updated cart to localStorage
        return updatedCart;
      } else {
        // If product is not in the cart, add it with quantity 1
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(newCart)); // Save the new cart to localStorage
        return newCart;
      }
    });
  
    toast.success("Product added to cart!");
  };  

  const openModal = (id: number) => {
    setSelectedProductId(id);
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout!");
  };

  const sortedProducts = sortOrder
  ? [...products].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    )
  : products; // Keep original order if sortOrder is null

  return (
    <div className="container mx-auto p-4">
      <div className={"flex justify-end items-center" + (darkMode ? " text-white" : " text-black")}>
        {/* Sort by Price */}
        <div className="flex items-center justify-end mb-4">
          <label className="mr-2 font-bold">Price : </label>
          <select
            value={sortOrder ?? ""}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | null)}
            className={"rounded-md border shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" + (darkMode ? " bg-gray-700 hover:bg-gray-600 border-gray-600" : " bg-white hover:bg-gray-100 border-gray-300")}
          >
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        {/* Cart */}
        <div className="flex items-center justify-end mb-4 relative">
          <button
            onClick={() => setIsOpenCartModel(true)}
            className="text-black px-4 py-2 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={darkMode ? "white" : "black"} className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
              {cart.length}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenModal={openModal}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {selectedProductId && <ProductDetails closeModal={() => setSelectedProductId(null)} id={selectedProductId} />}

      {isOpenCartModel && (
        <CartModal 
          closeModal={() => setIsOpenCartModel(false)} 
          onCheckout={handleCheckout} 
          setCart={setCart} // Passing setCart here
        />
      )}
    </div>
  );
};

export default ProductList;
