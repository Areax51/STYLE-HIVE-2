import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-gold font-bold text-xl">StyleHive</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gold">
          Home
        </Link>
        <Link to="/chat" className="hover:text-gold font-semibold">
          AI Chat
        </Link>
        <Link to="/favorites" className="text-gold hover:underline">
          Favorites
        </Link>
        <Link to="/stylist" className="text-gold hover:underline">
          AI Outfit Stylist
        </Link>

        {/* other links */}
      </div>
    </nav>
  );
};

export default Navbar;
