import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // your auth provider
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // While we're verifying the token / fetching user
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader2 size={48} className="animate-spin text-gold" />
      </div>
    );
  }

  // Not logged in → redirect to login, remember where we came from
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Authenticated → render children
  return <>{children}</>;
};

export default ProtectedRoute;
