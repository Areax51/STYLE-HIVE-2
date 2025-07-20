// src/pages/RecommendPage.jsx
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "../utils/axios";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const RecommendPage = () => {
  const { cart } = useCart();
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await axios.post("/recommend", { saved: cart });
        if (Array.isArray(res.data)) {
          setRecommended(res.data);
        } else if (Array.isArray(res.data.recommendations)) {
          setRecommended(res.data.recommendations);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        toast.error("Could not load recommendations");
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchRecommendations();
    }
  }, [cart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-gold mb-8 text-center">
        Recommended for You
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">
          Your cart is empty. Add some items to get personalized
          recommendations.
        </p>
      ) : recommended.length === 0 ? (
        <p className="text-center text-gray-400">
          No recommendations yet. Try adding more products to your cart!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommended.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendPage;
