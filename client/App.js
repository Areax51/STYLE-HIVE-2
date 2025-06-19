import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
const isLoggedIn = !!localStorage.getItem("token");
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/" element={<ProductListPage />} />;
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
