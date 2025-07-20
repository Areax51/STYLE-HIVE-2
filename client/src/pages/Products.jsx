// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useFavorites } from "../context/FavoritesContext";
import fallbackProducts from "../data/fallbackProducts";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToFavorites, isFavorited, removeFromFavorites } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(Array.isArray(res.data) ? res.data : res.data.products);
      } catch (err) {
        console.error("Product API error, using fallback:", err);
        setProducts(fallbackProducts);
        toast.warn("Failed to fetch products; showing fallback data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) &&
    (filter === "All" || p.category === filter)
  );

  const handleAI = async () => {
    if (!selected) return;
    try {
      const res = await axios.post("/chat/image", {
        prompt: `Give fashion tips for ${selected.name}`,
      });
      setAiResponse(res.data.reply);
    } catch (err) {
      console.error("AI styling error:", err);
      setAiResponse("⚠️ Could not get AI feedback.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-gold text-center mb-8">
        Explore Fashion Picks
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search styles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option>All Categories</option>
          <option>Men</option>
          <option>Women</option>
          <option>Accessories</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            No products found.
          </p>
        ) : (
          filtered.map((p) => (
            <div
              key={p._id}
              onClick={() => { setSelected(p); setAiResponse(""); }}
              className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-gold/30 transition cursor-pointer"
            >
              <img
                src={p.image}
                alt={p.name}
                onError={(e) => { e.currentTarget.src = "/placeholder-300.png"; }}
                className="w-full h-56 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold text-gold mb-1">{p.name}</h2>
              <p className="text-sm text-gray-400 mb-2">{p.description}</p>
              <p className="text-lg font-bold text-white mb-2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.price)}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gold mb-2">{selected.name}</h2>
            <p className="text-gray-300 mb-2">{selected.description}</p>
            <p className="text-lg font-bold mb-4 text-white">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selected.price)}</p>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => {
                  isFavorited(selected._id)
                    ? removeFromFavorites(selected._id)
                    : addToFavorites(selected);
                }}
                className="flex-1 bg-gold text-black font-bold py-2 rounded-lg hover:bg-yellow-400 transition"
              >
                {isFavorited(selected._id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button
                onClick={handleAI}
                className="flex-1 border border-gold text-gold font-bold py-2 rounded-lg hover:bg-gold hover:text-black transition"
              >
                Try in AI
              </button>
            </div>
            {aiResponse && (
              <p className="text-sm bg-white/10 border border-gold p-4 rounded-lg whitespace-pre-wrap text-white">
                {aiResponse}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
