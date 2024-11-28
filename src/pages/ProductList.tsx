import { useState } from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import ProductDetails from "./ProductDetails";

const ProductList = ({ products }: { products: ProductCardProps["product"][] }) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // null means no sorting

  const handleOpenModal = (id: number) => {
    setSelectedProductId(id);
  };

  const sortedProducts = sortOrder
    ? [...products].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      )
    : products; // If no sorting, show the original order

  return (
    <div>
      {/* Sort by Price */}
      <div className="flex items-center justify-end mb-4">
        <label className="mr-2 font-bold text-gray-700">Sort by Price:</label>
        <select
          value={sortOrder ?? ""}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | null)}
          className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onOpenModal={handleOpenModal} />
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
    </div>
  );
};

export default ProductList;
