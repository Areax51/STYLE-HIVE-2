import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
        Welcome to StyleHive
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        Your AI-powered fashion assistant. Get outfit ideas, discover trending
        styles, and shop smarter — all in one stylish hive.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/chat"
          className="px-6 py-3 bg-gold text-black font-semibold rounded-xl hover:bg-yellow-400 transition"
        >
          Start Styling
        </Link>
        <Link
          to="/favorites"
          className="px-6 py-3 border border-gold text-gold font-semibold rounded-xl hover:bg-white hover:text-black transition"
        >
          View Favorites
        </Link>
      </div>

      <div className="mt-16 text-gray-500 text-sm">
        Powered by AI • Styled by You • Made for the Hive
      </div>
    </div>
  );
};

export default Home;
