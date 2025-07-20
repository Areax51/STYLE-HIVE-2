import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => (
  <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center px-6 py-12">
    <div className="text-center max-w-2xl space-y-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gold font-Orbitron">
        Welcome to StyleHive
      </h1>
      <p className="text-lg text-gray-300 font-Outfit">
        Discover AI-powered fashion, personalized styling, and the trendiest
        looks — all in one hive.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3 bg-gold text-black text-lg font-semibold rounded-xl hover:bg-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-gold"
        >
          Browse Products
          <ArrowRight size={20} className="ml-2" />
        </Link>
        <Link
          to="/chat"
          className="inline-flex items-center justify-center px-6 py-3 border border-gold text-gold text-lg font-semibold rounded-xl hover:bg-gold hover:text-black transition focus:outline-none focus:ring-2 focus:ring-gold"
        >
          Ask the AI Stylist
        </Link>
      </div>
    </div>
  </section>
);

export default Home;
