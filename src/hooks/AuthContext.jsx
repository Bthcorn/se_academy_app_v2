import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Config } from "../components/config";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await axios.get(Config.API_URL + "/user/" + userId, {
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        setUser(response.data);
        setIsLoggedIn(true);
        setIsAdmin(user.isAdmin);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }

    if (token && userId) {
      fetchUser();
      console.log("User fetched");
    }
  }, []);

  const login = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser({});
  };

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    token,
    isAdmin,
    getUserId,
    userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
