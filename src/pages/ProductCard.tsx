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
}

/**
 * A ProductCard component that displays a product's information.
 *
 * @param {ProductCardProps} props
 * @prop {Object} product - The product to display, with `id`, `title`, `thumbnail`, `price`, and `rating` properties.
 * @prop {function} onOpenModal - A callback to open the product modal with the product's ID.
 *
 * @returns A JSX element representing the product card.
 */
const ProductCard = ({ product, onOpenModal }: ProductCardProps) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={
        darkMode
          ? "p-4 bg-gray-800 shadow rounded hover:shadow-lg transition"
          : "p-4 bg-white shadow rounded hover:shadow-lg transition"
      }
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <p className="text-yellow-500">
        {"★".repeat(Math.round(product.rating))}{" "}
        <span className="text-gray-400">
          {5 - Math.round(product.rating)
            ? "☆".repeat(5 - Math.round(product.rating))
            : ""}
        </span>
      </p>
      <button
        onClick={() => onOpenModal(product.id)}
        className="text-blue-500 hover:underline"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
