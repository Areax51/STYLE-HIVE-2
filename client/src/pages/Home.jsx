import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import Saved from "./Savedd";
import Recommend from "./Recommend";
import Chat from "./Chat";
import ProtectedRoute from "../components/ProtectedRoute";
import Favorites from "./Favorites";
import ImageStylist from "../components/ImageStylist";
import ChatBoxRealtime from "../components/ChatBoxRealtime";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/stylist" element={<ImageStylist />} />
        <Route path="/chat-live" element={<ChatBoxRealtime />} />

        {/* Protected Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommend"
          element={
            <ProtectedRoute>
              <Recommend />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
