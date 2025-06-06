import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter === "All" || product.category === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="bg-black text-white min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">
        Discover Styles
      </h1>

      {/* Search & Filter */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded bg-futuristic-gray border border-gold text-white w-full max-w-md"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["All", "Menswear", "Womenswear", "Accessories"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded text-sm ${
              filter === cat
                ? "bg-gold text-black"
                : "bg-futuristic-gray hover:bg-gold hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))
        ) : (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
