import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-gold mb-6 text-center">
        All Products
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
