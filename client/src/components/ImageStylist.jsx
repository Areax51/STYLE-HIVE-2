import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ImageStylist = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResponse("");
    setError("");
  };

  const sendToAI = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(res.data.response);
    } catch (err) {
      console.error("Image styling error:", err.response?.data || err.message);
      setError("⚠️ AI could not process your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gold mb-6">AI Style Feedback</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendToAI();
        }}
        className="w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="image-upload"
            className="block mb-2 text-sm text-gray-300"
          >
            Upload your outfit image
          </label>
          <input
            id="image-upload"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
            className="w-full text-white bg-gray-800 border border-gray-700 rounded-lg file:bg-gold file:text-black file:border-none file:px-4 file:py-2"
            required
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-lg border border-gold mb-4"
          />
        )}

        <button
          type="submit"
          disabled={loading || !image}
          className="w-full bg-gold text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition"
        >
          {loading ? "Analyzing..." : "Get Style Advice"}
        </button>
      </form>

      {error && (
        <p className="text-red-500 mt-4 font-medium text-center">{error}</p>
      )}

      {response && (
        <div className="mt-6 bg-white/10 p-4 rounded-lg border border-gold max-w-md">
          <h2 className="text-xl font-semibold text-gold mb-2">
            StyleHive AI says:
          </h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ImageStylist;
