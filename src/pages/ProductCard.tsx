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
      <img
        src={product.thumbnail}
        alt={product.title}
        className="object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <p className="text-yellow-500 mb-4">
        {"★".repeat(Math.round(product.rating))}
        <span className="text-gray-400">
          {5 - Math.round(product.rating)
            ? "☆".repeat(5 - Math.round(product.rating))
            : ""}
        </span>
      </p>

      <div className="flex justify-between">
        <button
          onClick={() => onOpenModal(product.id)}
          className="text-blue-500 hover:underline"
        >
          View Details
        </button>

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
