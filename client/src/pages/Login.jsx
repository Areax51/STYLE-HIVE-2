import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../utils/api";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Logged in successfully!");
      // give the toast a moment, then redirect
      setTimeout(() => navigate(from, { replace: true }), 800);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gold mb-6 text-center">
          Login to StyleHive
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center px-4 py-2 font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gold ${
              loading
                ? "bg-gold opacity-50 cursor-not-allowed"
                : "bg-gold hover:bg-yellow-400"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-gold hover:underline focus:outline-none focus:ring-1 focus:ring-gold"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
