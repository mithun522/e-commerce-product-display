import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  thumbnail: string;
  images: string[];
}


const ProductDetails = ({
  id,
  closeModal,
}: {
  id: number;
  closeModal: () => void;
}) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get<Product>(`https://dummyjson.com/products/${id}`).then((response: AxiosResponse<Product>) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 fixed inset-0 z-50" onClick={closeModal}>
      <div className="p-6 max-w-4xl w-full bg-white shadow-lg rounded-lg relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={closeModal} // Replace with your modal close handler
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Scrollable Container */}
        <div className="h-[75vh] overflow-y-auto">
          {/* Product Images */}
          <div className="mb-6">
            <div className="flex flex-col items-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="object-cover rounded mb-4"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`product-${index}`}
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <h1 className="text-4xl font-bold mb-2 text-gray-800">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="mb-4">
            <p className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}{" "}
              <span className="text-sm text-gray-500 line-through">
                ${(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
              </span>
            </p>
            <p className="text-gray-600">Discount: {product.discountPercentage}%</p>
            <p className="text-yellow-500">
              Rating: {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))} ({product.rating})
            </p>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-800 font-bold">Category:</p>
              <p className="text-gray-600">{product.category}</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Brand:</p>
              <p className="text-gray-600">{product.brand}</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Stock Status:</p>
              <p className="text-gray-600">{product.availabilityStatus}</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">SKU:</p>
              <p className="text-gray-600">{product.sku}</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Weight:</p>
              <p className="text-gray-600">{product.weight}g</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Dimensions:</p>
              <p className="text-gray-600">
                {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
              </p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Warranty:</p>
              <p className="text-gray-600">{product.warrantyInformation}</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Shipping Info:</p>
              <p className="text-gray-600">{product.shippingInformation}</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Return Policy:</p>
              <p className="text-gray-600">{product.returnPolicy}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <p className="text-gray-800 font-bold mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>
            {product.reviews.map((review, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <p className="font-bold text-gray-800">{review.reviewerName}</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()} | Rating:{" "}
                  {"★".repeat(review.rating)}{" "}
                  {"☆".repeat(5 - review.rating)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
