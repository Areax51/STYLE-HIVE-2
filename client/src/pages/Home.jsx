import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home"; // ✅ FIXED: Correct relative path
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import Saved from "./Savedd";
import Recommend from "./Recommend";
import Chat from "./Chat";
import ProtectedRoute from "../components/ProtectedRoute"; // ✅ Also fix this
import Favorites from "./Favorites";
import ImageStylist from "../components/ImageStylist";

import ChatBoxRealtime from "../components/ChatBoxRealtime";

// ❗ Remove or import ChatBox if needed
// import ChatBox from "./components/ChatBox"; // Uncomment if you still need it

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ❌ This route is conflicting or unnecessary — remove if not used */}
        {/* <Route path="/chat" element={<ChatBox />} /> */}

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
    </Router>
  );
}

export default App;
