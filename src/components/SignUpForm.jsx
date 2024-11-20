import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Toast from "./Toast";

const SignUpForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [year, setYear] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return (
      firstname &&
      lastname &&
      year &&
      validateEmail(email) &&
      username &&
      password >= 8
    );
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
      firstname,
      lastname,
      year,
      email,
    };

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        if (data["success"] == true) {
          Toast("User created successfully", "success");
          navigate("/login");
        } else {
          Toast(data["error_msg"], "error");
        }
      }
    } catch (error) {
      console.error(error);
      Toast("Error creating user", "error");
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-gray-400 shadow-xl md:p-10">
      {" "}
      {/* Adjusted max width */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div>
            <h1>First Name</h1>
            <div className="mb-4">
              <input
                id="firstname"
                type="text"
                placeholder="first name"
                className="w-full rounded border border-gray-300 p-3"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <h1>Last Name</h1>
            <div className="mb-4">
              <input
                id="lastname"
                type="text"
                placeholder="last name"
                className="w-full rounded border border-gray-300 p-3"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <h1>Year</h1> {/* Corrected class attribute */}
        <div className="mb-4">
          <select
            name="year"
            id="year"
            placeholder="degree year"
            className="w-full rounded border border-gray-300 p-3"
            value={year}
            onChange={(e) => {
              setYear(parseInt(e.target.value));
            }}
            required
          >
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">Graduated</option>
          </select>
        </div>
        <h1>Email</h1> {/* Corrected class attribute */}
        <div className="mb-4">
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="w-full rounded border border-gray-300 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <h1>Username</h1> {/* Corrected class attribute */}
        <div className="mb-4">
          <input
            id="username"
            type="text"
            placeholder="your Username"
            className="w-full rounded border border-gray-300 p-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <h1 className="">Password</h1>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="w-full rounded border border-gray-300 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            // disabled={!validateForm()}
            onClick={() => {
              console.log("Sign Up button clicked");
            }}
          >
            <span className="inline-flex text-sm md:text-base">Sign Up</span>
          </button>
          <a
            href="#"
            className="inline-flex text-sm text-blue-500 hover:underline"
          >
            Help? Contact support
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
