import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Loader2, X } from "lucide-react";

// simple utility to join conditional Tailwind classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ImageStylist = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // redirect if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResponse("");
    setError("");
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
    setResponse("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendToAI = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    setResponse("");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResponse(res.data.response);
    } catch (err) {
      console.error("Image styling error:", err.response?.data || err.message);
      setError("⚠️ AI could not process your image. Try another one.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">
        AI Style Feedback
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendToAI();
        }}
        className="w-full max-w-md space-y-6"
      >
        <fieldset className="space-y-2">
          <legend className="sr-only">Upload your outfit image</legend>
          <label htmlFor="image-upload" className="block text-sm text-gray-300">
            Upload your outfit image
          </label>
          <input
            id="image-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white file:bg-gold file:text-black file:px-4 file:py-2 focus:outline-none"
            required
          />
        </fieldset>

        {preview && (
          <figure className="relative">
            <img
              src={preview}
              alt="Selected outfit preview"
              className="w-full rounded-lg border border-gold"
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove selected image"
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <X size={16} />
            </button>
          </figure>
        )}

        <button
          type="submit"
          disabled={loading || !image}
          className={classNames(
            "w-full flex items-center justify-center font-bold py-2 px-4 rounded transition",
            loading || !image
              ? "bg-gold opacity-50 cursor-not-allowed"
              : "bg-gold hover:bg-yellow-400"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Analyzing...
            </>
          ) : (
            "Get Style Advice"
          )}
        </button>
      </form>

      <div
        aria-live="polite"
        className="w-full max-w-md mt-6 space-y-4 text-center"
      >
        {error && <p className="text-red-500 font-medium">{error}</p>}
        {response && (
          <div className="bg-white/10 p-4 rounded-lg border border-gold">
            <h2 className="text-xl font-semibold text-gold mb-2">
              StyleHive AI says:
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {response}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageStylist;
