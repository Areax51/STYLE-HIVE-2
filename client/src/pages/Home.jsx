import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gold mb-6 leading-tight font-[Orbitron]">
          Welcome to StyleHive
        </h1>
        <p className="text-lg text-gray-300 mb-8 font-outfit">
          Discover AI-powered fashion, personalized styling, and the trendiest
          looks — all in one hive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="btn-gold flex items-center justify-center gap-2 text-lg"
          >
            Browse Products <ArrowRight size={20} />
          </Link>
          <Link
            to="/chat"
            className="px-6 py-2 border border-gold text-gold rounded-xl hover:bg-gold hover:text-black transition text-lg font-semibold"
          >
            Ask the AI Stylist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
