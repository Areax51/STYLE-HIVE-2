import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// Simple helper to merge Tailwind classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddProductPage = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "Menswear",
  });
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const navigate = useNavigate();

  // If you want to guard this page, you could redirect here if no auth token
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (e.target.name === "image") {
      setPreviewError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/products", form);
      toast.success("Product added successfully!");
      setTimeout(() => navigate("/products"), 800);
    } catch (err) {
      console.error("Add product error:", err);
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">
          Add New Product
        </h2>

        {/** Preview */}
        {form.image && !previewError && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Image Preview:</p>
            <img
              src={form.image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-gold"
              onError={() => setPreviewError(true)}
            />
            {previewError && (
              <p className="text-red-400 mt-2 text-sm">
                Unable to load preview.
              </p>
            )}
          </div>
        )}

        {/** Form fields */}
        <div className="space-y-5">
          {[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: false,
            },
            { name: "image", label: "Image URL", type: "url", required: true },
            {
              name: "price",
              label: "Price (USD)",
              type: "number",
              required: true,
              step: "0.01",
            },
          ].map(({ name, label, type, required, step }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  rows={3}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black text-white rounded-lg border border-gold focus:outline-none focus:ring-2 focus:ring-gold"
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  step={step}
                  value={form[name]}
                  onChange={handleChange}
                  required={required}
                  placeholder={`Enter ${label}`}
                  className="w-full px-4 py-2 bg-black text-white rounded-lg border border-gold focus:outline-none focus:ring-2 focus:ring-gold"
                />
              )}
            </div>
          ))}

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black text-white rounded-lg border border-gold focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option>Menswear</option>
              <option>Womenswear</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        {/** Submit */}
        <button
          type="submit"
          disabled={loading}
          className={classNames(
            "mt-6 w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold",
            loading
              ? "bg-gold opacity-50 cursor-not-allowed"
              : "bg-gold hover:bg-yellow-400"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Submitting...
            </>
          ) : (
            "Submit Product"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddProductPage;
