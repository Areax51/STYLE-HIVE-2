// client/src/App.jsx
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Saved from "./pages/Savedd";
import Recommend from "./pages/Recommend";
import Chat from "./pages/Chat";
import Favorites from "./pages/Favorites";
import ImageStylist from "./components/ImageStylist";
import ChatBoxRealtime from "./components/ChatBoxRealtime";
import Products from "./pages/Products";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/stylist" element={<ImageStylist />} />
          <Route path="/chat-live" element={<ChatBoxRealtime />} />
          <Route path="/products" element={<Products />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
