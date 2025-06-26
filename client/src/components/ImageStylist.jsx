import { useState } from "react";
import axios from "axios";

const ImageStylist = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      console.error("Image styling error:", err.message);
      setError("⚠️ AI could not process your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">AI Style Feedback</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="mb-4 text-white"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full max-w-md rounded-lg border border-gold mb-4"
        />
      )}

      <button
        onClick={sendToAI}
        disabled={loading || !image}
        className="bg-gold text-black px-6 py-3 font-bold rounded hover:bg-yellow-400 transition"
      >
        {loading ? "Analyzing..." : "Get Style Advice"}
      </button>

      {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}

      {response && (
        <div className="mt-6 bg-white/10 p-4 rounded-lg border border-gold">
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
