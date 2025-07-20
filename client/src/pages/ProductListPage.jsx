// src/pages/ProductListPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductCard from "../components/ProductCard";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data.products || res.data);
      } catch (err) {
        console.error("Product fetch error:", err);
        toast.error("Failed to fetch products. Please try again.");
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-gold mb-8 text-center">
        All Products
      </h1>

      {error ? (
        <p className="text-center text-red-500 mb-6">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductListPage;
