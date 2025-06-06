import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Recommend = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("stylehive-cart")) || [];

    const fetchRecommendations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ saved }),
        });

        const data = await res.json();
        setRecommended(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (saved.length > 0) fetchRecommendations();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">
        Recommended for You
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommended.length > 0 ? (
          recommended.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))
        ) : (
          <p className="text-center col-span-full">
            No recommendations yet. Save some products first!
          </p>
        )}
      </div>
    </div>
  );
};

export default Recommend;
