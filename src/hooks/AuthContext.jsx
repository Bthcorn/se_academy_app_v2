import { createContext, useEffect, useState } from "react";
import { Config } from "../components/config";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId");
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + "/user/" + id, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        setUser(response.data);
        setIsAdmin(response.data.role === "admin");
        setUserId(response.data.id);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && userId) {
      setIsLoggedIn(true);
      fetchUser(userId);
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, [token, userId]);

  const login = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId);
    setLoading(true);
    fetchUser(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setLoading(false);
  };

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  if (loading) {
    return (
      <div className="flex h-dvh w-full items-center justify-center text-xl">
        Loading...
      </div>
    ); // Show loading spinner or placeholder
  }

  const value = {
    isLoggedIn,
    login,
    logout,
    token,
    isAdmin,
    user,
    setIsAdmin,
    getUserId,
    userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
