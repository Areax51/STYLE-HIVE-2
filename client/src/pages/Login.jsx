import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/chat");
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-gold rounded-xl p-8 shadow-gold w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gold mb-6 text-center">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gold focus:outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded bg-gray-800 text-white border border-gold focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-gold text-black font-bold py-3 rounded hover:bg-yellow-400 transition"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-gold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
