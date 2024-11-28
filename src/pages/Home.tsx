import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa"; // Importing the up arrow icon
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Shimmer from "./Shimmer";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<AxiosResponse<{ products: Product[] }>>("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  // Track scroll position and show/hide the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true); // Show button after 300px scroll
      } else {
        setShowScrollButton(false); // Hide button when scrolled to top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <main className="p-6 mt-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Shimmer key={index} />
            ))}
          </div>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </main>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Home;
