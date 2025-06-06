import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-futuristic-gray text-gold px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">StyleHive</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
        <Link to="/products" className="hover:underline">
          Discover
        </Link>
        <Link to="/recommend" className="text-white hover:text-gold">
          Recommend
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
