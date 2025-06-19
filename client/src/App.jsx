import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Saved from "./pages/Savedd";
import Recommend from "./pages/Recommend";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import Favorites from "./pages/Favorites"; // adjust path if different

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/favorites" element={<Favorites />} /> {/* 👈 NEW */}
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
