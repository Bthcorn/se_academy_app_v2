import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, setIsAdmin } = useAuth();

  const validateForm = () => {
    return username && password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        if (data["success"] == true) {
          alert("Login successful");

          localStorage.setItem("token", response.headers.get("Authorization"));
          // login with AuthContext ensuring user is logged in
          login(response.headers.get("Authorization"), data["id"]);
          // check if user is admin
          if (data["role"] == "admin") {
            setIsAdmin(true);
            navigate("/admin/dashboard");
          }
          navigate("/");
        } else {
          alert("Error: " + data["error_msg"]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl rounded-lg bg-white p-8 text-gray-400 shadow-xl md:p-10">
      {" "}
      {/* Adjusted max width */}
      <form onSubmit={handleSubmit}>
        <h1>Username</h1> {/* Corrected class attribute */}
        <div className="mb-4">
          <input
            id="username"
            type="text"
            placeholder="Your Username"
            className="w-full rounded border border-gray-300 p-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <h1 className="mt-10">Password</h1>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="w-full rounded border border-gray-300 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            disabled={!validateForm()}
          >
            Login
          </button>
          <Link
            to="/signup"
            className="pl-20 text-sm text-blue-500 hover:underline"
          >
            Don’t have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
