import { useTheme } from "../context/ThemeProvider";

export interface ProductCardProps {
  product: {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    rating: number;
  };
  onOpenModal: (id: number) => void;
  onAddToCart: (product: ProductCardProps["product"]) => void;
}

/**
 * A ProductCard component that displays a product's information.
 *
 * @param {ProductCardProps} props
 * @prop {Object} product - The product to display, with `id`, `title`, `thumbnail`, `price`, and `rating` properties.
 * @prop {function} onOpenModal - A callback to open the product modal with the product's ID.
 * @prop {function} onAddToCart - A callback to add the product to the cart with a specified quantity.
 *
 * @returns A JSX element representing the product card.
 */
const ProductCard = ({ product, onOpenModal, onAddToCart }: ProductCardProps) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={
        darkMode
          ? "p-4 bg-gray-800 shadow rounded hover:shadow-lg transition"
          : "p-4 bg-white shadow rounded hover:shadow-lg transition"
      }
    >
      {/* Product Thumbnail */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="object-cover rounded mb-4"
      />

      {/* Product Title */}
      <h2 className="text-lg font-bold mb-2">{product.title}</h2>

      {/* Product Price */}
      <p className="text-gray-600 mb-2">${product.price}</p>

      {/* Product Rating */}
      <p className="text-yellow-500 mb-4">
        {"★".repeat(Math.round(product.rating))}{" "}
        <span className="text-gray-400">
          {5 - Math.round(product.rating)
            ? "☆".repeat(5 - Math.round(product.rating))
            : ""}
        </span>
      </p>

      {/* Buttons */}
      <div className="flex justify-between">
        {/* View Details Button */}
        <button
          onClick={() => onOpenModal(product.id)}
          className="text-blue-500 hover:underline"
        >
          View Details
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className={`p-2 text-xs rounded-full bg-transparent border hover:scale-105 transition duration-300 ease-in-out ${darkMode ? "text-gray-100 border-gray-100" : "text-black border-black"}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
