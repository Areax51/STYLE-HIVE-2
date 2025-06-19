import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products"); // Replace with your backend URL
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  // Apply search + filter
  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = filter === "All" || product.category === filter;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="px-4 py-6">
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 w-full sm:w-1/2 rounded border border-gold bg-black text-white"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded border border-gold bg-black text-white"
        >
          <option value="All">All Categories</option>
          <option value="Footwear">Footwear</option>
          <option value="Jackets">Jackets</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gold text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
