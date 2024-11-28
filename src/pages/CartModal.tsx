import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeProvider";
import { ProductCardProps } from "./ProductCard";

/**
 * A modal component that displays a list of items in the user's cart, along
 * with their total cost, and allows the user to remove items from the cart or
 * proceed to checkout.
 *
 * @param {() => void} closeModal
 *   A function that closes the modal when called.
 * @param {() => void} onCheckout
 *   A function that updates the cart count in the parent component when the
 *   user checks out.
 */
const CartModal = ({ closeModal, onCheckout }: { closeModal: () => void, onCheckout: () => void }) => {
  const [cart, setCart] = useState<ProductCardProps["product"][]>([]);
  const { darkMode } = useTheme();

  // Load cart items from localStorage when the page loads
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  /**
   * Removes an item from the cart and updates localStorage.
   * @param {number} productId The ID of the item to remove.
   */
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  /**
   * Clear the cart in state and localStorage, notify the parent component
   * to update the cart count, and close the modal.
   */
  const handleCheckout = () => {
    setCart([]); // Clear cart in state
    localStorage.setItem("cart", JSON.stringify([])); // Clear cart in localStorage
    toast.success("Checkout successful!");
    onCheckout(); // Inform the parent component to update the cart count
    closeModal(); // Close the modal
  };

  return (
    <div
      onClick={closeModal}
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        darkMode ? "bg-opacity-75" : "bg-opacity-50"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`p-6 rounded-lg w-11/12 sm:w-3/4 lg:w-1/2 xl:w-1/3 shadow-lg ${
          darkMode ? "text-white bg-gray-800" : "text-black bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={closeModal}
            className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100`}
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className={`flex justify-between items-center py-4 border-b border-gray-300 dark:border-gray-700`}
                >
                  <div className="flex-1">
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <div className="flex-1 text-right">
                    <span className="text-lg">${item.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Total Amount */}
        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl font-bold">Total:</h3>
          <span className="text-lg">${totalAmount}</span>
        </div>

        {/* Proceed to Checkout Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCheckout}
            className={`bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
