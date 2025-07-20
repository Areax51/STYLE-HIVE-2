// client/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedStylesPage from "./pages/SavedStylesPage";
import Recommend from "./pages/Recommend";
import Chat from "./pages/Chat";
import ImageStylist from "./components/ImageStylist";
import ChatBoxRealtime from "./components/ChatBoxRealtime";
import Products from "./pages/Products";

function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        theme="dark"
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/saved-styles"
            element={<PrivateRoute element={<SavedStylesPage />} />}
          />
          <Route
            path="/stylist"
            element={<PrivateRoute element={<ImageStylist />} />}
          />
          <Route
            path="/chat-live"
            element={<PrivateRoute element={<ChatBoxRealtime />} />}
          />
          <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/recommend" element={<Recommend />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}
