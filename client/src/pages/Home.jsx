import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-800 text-white px-6 py-12 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gold drop-shadow-lg mb-6">
        Welcome to <span className="text-white">StyleHive</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
        Discover trending styles, get personalized fashion recommendations from
        AI, and connect with fashion lovers like you.
      </p>
      <div className="bg-black text-gold text-4xl font-bold p-8 rounded-xl shadow-gold">
        🚨 If this box has no styles, Tailwind is still not working!
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/products"
          className="bg-gold text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition duration-300"
        >
          Explore Products
        </Link>
        <Link
          to="/chat"
          className="border border-gold text-gold px-6 py-3 rounded-full hover:bg-gold hover:text-black transition duration-300"
        >
          Ask the AI Stylist
        </Link>
        <Link
          to="/favorites"
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300"
        >
          View Favorites
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Sample images (replace with your real product/style images) */}
        <img
          src="https://source.unsplash.com/400x500/?fashion"
          alt="fashion"
          className="rounded-2xl shadow-lg hover:scale-105 transition duration-300"
        />
        <img
          src="https://source.unsplash.com/400x500/?streetwear"
          alt="style"
          className="rounded-2xl shadow-lg hover:scale-105 transition duration-300"
        />
        <img
          src="https://source.unsplash.com/400x500/?outfit"
          alt="look"
          className="rounded-2xl shadow-lg hover:scale-105 transition duration-300"
        />
      </div>
    </div>
  );
};

export default Home;
