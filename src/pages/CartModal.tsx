// CartModal.tsx

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsTrash, BsX } from "react-icons/bs";
import { useTheme } from "../context/ThemeProvider";
import { CartItem } from "./ProductList";

const CartModal = ({ closeModal, onCheckout, setCart }: { closeModal: () => void; onCheckout: () => void, setCart: React.Dispatch<React.SetStateAction<CartItem[]>> }) => {
  const [cart, setLocalCart] = useState<CartItem[]>([]); // Local state to manage cart in modal
  const { darkMode } = useTheme();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(storedCart);
    setLocalCart(storedCart);
  }, []);

  useEffect(() => {
    // Whenever cart changes in the modal, sync it with ProductList
    setCart(cart);
  }, [cart, setCart]);

  const removeOneFromCart = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    setLocalCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      closeModal();
      return;
    }

    setLocalCart([]);
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    toast.success("Checkout successful!");
    onCheckout();
    closeModal();
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
            <BsX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center">
              <div className="flex-1">
                <span className="block font-bold">{item.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  Quantity: {item.quantity}
                </span>
              </div>
              <div className="flex items-center justify-end">
                <span className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeOneFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <BsTrash size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-xl font-bold">Total: ₹{totalAmount}</span>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white py-2 px-4 rounded-full"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
