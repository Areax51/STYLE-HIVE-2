import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Reload so Navbar updates
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gold mb-6">Login</h2>

        {error && (
          <p className="bg-red-500 text-white text-sm p-2 mb-4 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold text-black font-bold py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-gold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
