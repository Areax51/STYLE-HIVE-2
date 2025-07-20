import { useState } from "react";
import axios from "../utils/axios";
import { Loader2 } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await axios.post("/products", form);
      setMessage("✅ Product created successfully!");
      setForm({ name: "", description: "", price: "", imageUrl: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">
          Create New Product
        </h2>

        {message && (
          <p
            className={`mb-4 text-sm ${
              message.startsWith("✅") ? "text-green-400" : "text-red-500"
            }`}
            role="alert"
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Price (USD)<span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {form.imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-400 mb-1">Preview:</p>
              <img
                src={form.imageUrl}
                alt="Product preview"
                onError={(e) => (e.currentTarget.src = "/placeholder-300.png")}
                className="w-full h-48 object-cover rounded-lg border border-gold"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={classNames(
              "w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold",
              loading
                ? "bg-gold opacity-50 cursor-not-allowed"
                : "bg-gold hover:bg-yellow-400"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductForm;
