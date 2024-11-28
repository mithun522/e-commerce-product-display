import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    axios
      .get<AxiosResponse<{ products: Product[] }>>("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query: string) => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <main className="p-6">
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
    </div>
  );
};

export default Home;
