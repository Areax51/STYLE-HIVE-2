import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axios";

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    // Optionally fetch the current user profile
    axios
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        // invalid token → clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = ({ token, user: userData }) => {
    // Save token first so axios interceptor picks it up
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
