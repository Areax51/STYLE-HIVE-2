import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      console.log(res.data);
      alert("Logged in!");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="bg-black text-gold min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 bg-futuristic-gray rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 bg-futuristic-gray rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-gold text-black font-bold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
