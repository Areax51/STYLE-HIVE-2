import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Saved = () => {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    setSavedProducts(JSON.parse(localStorage.getItem("saved")) || []);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">
        Saved Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {savedProducts.length > 0 ? (
          savedProducts.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))
        ) : (
          <p className="text-center col-span-full">No saved items.</p>
        )}
      </div>
    </div>
  );
};
export default Saved;
