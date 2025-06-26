import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DropdownNav from "./DropdownNav";
<DropdownNav />;
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-950 text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-800">
      <Link to="/" className="text-2xl font-bold text-gold">
        StyleHive
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/products" className="hover:text-gold transition">
          Products
        </Link>
        {user && (
          <Link to="/favorites" className="hover:text-gold transition">
            Favorites
          </Link>
        )}

        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-gold text-black px-4 py-2 rounded hover:bg-yellow-400 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-800 border border-gold px-4 py-2 rounded hover:bg-gold hover:text-black transition"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-2 bg-gray-800 border border-gold px-4 py-2 rounded hover:bg-gold hover:text-black transition"
            >
              {user.username}
              <span className="text-sm">▼</span>
            </button>
            {dropdown && (
              <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded shadow-lg w-40 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
