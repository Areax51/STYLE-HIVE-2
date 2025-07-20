import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gold mb-6 text-center">
          Login to StyleHive
        </h2>

        <LoginForm onSuccess={() => navigate(from, { replace: true })} />

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-gold hover:underline focus:outline-none focus:ring-1 focus:ring-gold"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
