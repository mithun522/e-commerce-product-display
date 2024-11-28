import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import CartModal from "./CartModal";
import ProductCard, { ProductCardProps } from "./ProductCard";
import ProductDetails from "./ProductDetails";

const ProductList = ({ products }: { products: ProductCardProps["product"][] }) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // null means no sorting
  const [cart, setCart] = useState<ProductCardProps["product"][]>([]); // Cart state
  const [isOpenCartModel, setIsOpenCartModel] = useState(false);
  const { darkMode } = useTheme();

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Add item to cart and store it in localStorage
  const handleAddToCart = (product: ProductCardProps["product"]) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Store updated cart in localStorage
  };

  const handleOpenModal = (id: number) => {
    setSelectedProductId(id);
  };

  const sortedProducts = sortOrder
    ? [...products].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      )
    : products; // If no sorting, show the original order

  // Handle Checkout
  const handleCheckout = () => {
    setCart([]); // Clear cart in state
    localStorage.setItem("cart", JSON.stringify([])); // Clear cart in localStorage
  };

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
        {/* Cart Link */}
        <div className="flex justify-end mb-4 relative">
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onOpenModal={handleOpenModal} />
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProductId && (
        <ProductDetails
          id={selectedProductId}
          closeModal={() => setSelectedProductId(null)} // Callback to reset ID
        />
      )}

      {/* Cart Modal */}
      {isOpenCartModel && (
        <CartModal
          closeModal={() => setIsOpenCartModel(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default ProductList;
