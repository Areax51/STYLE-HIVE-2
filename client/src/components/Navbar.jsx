import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DropdownNav from "./DropdownNav";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // update when localStorage.user changes
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("user");
      }
    } else {
      setUser(null);
    }
  }, [localStorage.getItem("user")]);

  return (
    <nav className="bg-black border-b border-gold text-white px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="text-2xl font-extrabold text-gold hover:opacity-80 transition"
      >
        StyleHive
      </Link>

      <div className="flex items-center space-x-6">
        <Link
          to="/products"
          className="hover:text-gold transition focus:outline-none focus:ring-2 focus:ring-gold"
        >
          Products
        </Link>

        {user && (
          <>
            <Link
              to="/favorites"
              className="hover:text-gold transition focus:outline-none focus:ring-2 focus:ring-gold"
            >
              Favorites
            </Link>
            <Link
              to="/stylist"
              className="hover:text-gold transition focus:outline-none focus:ring-2 focus:ring-gold"
            >
              Try AI Stylist
            </Link>
          </>
        )}

        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-gold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-800 border border-gold px-4 py-2 rounded-lg font-semibold hover:bg-gold hover:text-black transition focus:outline-none focus:ring-2 focus:ring-gold"
            >
              Register
            </Link>
          </>
        ) : (
          <DropdownNav />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
