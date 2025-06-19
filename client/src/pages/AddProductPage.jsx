import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "Menswear",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // JWT token from login

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/"); // go back to homepage
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-futuristic-gray p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gold mb-4">Add New Product</h2>

        {["name", "description", "image", "price"].map((field) => (
          <div key={field} className="mb-4">
            <input
              type={field === "price" ? "number" : "text"}
              name={field}
              value={product[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full p-2 bg-black border border-gold rounded text-white"
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 bg-black border border-gold rounded text-white"
          >
            <option>Menswear</option>
            <option>Womenswear</option>
            <option>Accessories</option>
          </select>
        </div>

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-gold text-black font-semibold rounded hover:bg-yellow-400"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
