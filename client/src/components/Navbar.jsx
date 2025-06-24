import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-gold tracking-wider">StyleHive</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gold transition duration-300">
          Home
        </Link>
        <Link
          to="/chat"
          className="hover:text-gold font-semibold transition duration-300"
        >
          AI Chat
        </Link>
        <Link to="/favorites" className="text-gold hover:underline">
          Favorites
        </Link>
        <Link to="/stylist" className="text-gold hover:underline">
          AI Stylist
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
