import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios"; // your preconfigured axios
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Logged in successfully!");
      // short delay to show success, then navigate
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Invalid credentials, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">
          StyleHive Login
        </h2>

        {message && (
          <p
            className={`text-sm mb-4 ${
              message.includes("success") ? "text-green-400" : "text-red-500"
            }`}
            role="alert"
          >
            {message}
          </p>
        )}

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
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
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
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition ${
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
      </div>
    </section>
  );
};

export default LoginForm;
