import { useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import fallbackProducts from "../data/FallbackProducts";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToFavorites } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch from API. Using fallback products.");
        setProducts(fallbackProducts); // ✅ use fallback
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "All" || product.category === filter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-6 py-10 relative">
      <h1 className="text-4xl font-bold text-center text-gold mb-6">
        Explore Fashion Picks
      </h1>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search styles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option value="All">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* 🛍 Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-gold/30 transition duration-300 p-4 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold text-gold">
                {product.name}
              </h2>
              <p className="text-sm text-gray-400 mb-2">
                {product.description}
              </p>
              <p className="text-lg font-bold text-white">${product.price}</p>
            </div>
          ))
        )}
      </div>

      {/* 🪟 Modal View */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[600px] relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-4 text-white text-2xl font-bold hover:text-gold"
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-gold mb-2">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-300 mb-2">{selectedProduct.description}</p>
            <p className="text-lg font-bold mb-4">${selectedProduct.price}</p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => addToFavorites(selectedProduct._id)}
                className="flex-1 bg-gold text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition"
              >
                Add to Favorites
              </button>
              <button className="flex-1 border border-gold text-gold font-bold py-2 px-4 rounded-lg hover:bg-gold hover:text-black transition">
                Try in AI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
