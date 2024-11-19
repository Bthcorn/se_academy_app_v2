import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserEdit = () => {
  const location = useLocation(); // Get passed state (user data)
  const navigate = useNavigate();
  const { user, users, setUsers } = location.state; // Destructure user data and users array

  // Set up state for the form fields
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    year: user.year,
    role: user.role,
    status: user.status,
    level: user.level,
    score: user.score,
    study_hours: user.study_hours,
    avatar_image: user.avatar,
    password: user.password,
    confirmPassword: "", // Separate field for confirm password
  });

  const [passwordError, setPasswordError] = useState(""); // State for password error message

  // Handler to update form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for form submission (updating the sample data)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return; // Prevent form submission
    }

    // Clear password error if passwords match
    setPasswordError("");

    // Update the user in the users array
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, ...formData } : u,
    );

    // Update the global users state
    setUsers(updatedUsers);

    // Redirect back to the users list after updating
    navigate("/admin/users");
  };

  return (
    <div className="min-h-screen bg-[#1E293B] p-6 text-white">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Profile Picture Section */}
        <div className="col-span-1 flex flex-col items-center rounded-lg bg-[#2E3A47] p-6 shadow-lg">
          <img
            src={formData.avatar}
            alt="User Avatar"
            className="mb-4 h-32 w-32 rounded-full"
          />
          <input
            type="file"
            className="mb-4 rounded bg-gray-700 px-4 py-2 text-sm text-white"
            id="avatarUpload"
            name="avatar"
            accept="image/*"
          />
          <p className="text-lg font-semibold">{formData.username}</p>
        </div>

        {/* Right Form Section */}
        <div className="col-span-2 rounded-lg bg-[#2E3A47] p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="mb-1 block">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full rounded-md bg-[#334155] p-2 text-white"
              />
            </div>

            {/* Password and Confirm Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-[#334155] p-2 text-white"
                />
              </div>
              <div>
                <label className="mb-1 block">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-[#334155] p-2 text-white"
                />
              </div>
            </div>

            {/* Password Error Message */}
            {passwordError && <p className="text-red-500">{passwordError}</p>}

            {/* Email Field */}
            <div>
              <label className="mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-md bg-[#334155] p-2 text-white"
              />
            </div>

            {/* Year Selection */}
            <div>
              <label className="mb-1 block">Year</label>
              <select
                name="year"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full rounded-md bg-[#334155] p-2 text-white"
              >
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Post-Grad">Post-Grad</option>
              </select>
            </div>

            {/* Status Field */}
            <div>
              <label className="mb-1 block">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded-md bg-[#334155] p-2 text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Level and Points Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block">Level</label>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-[#334155] p-2 text-white"
                />
              </div>
              <div>
                <label className="mb-1 block">Points</label>
                <input
                  type="number"
                  name="points"
                  value={formData.score}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-[#334155] p-2 text-white"
                />
              </div>
            </div>

            {/* Total Study Time Field */}
            <div>
              <label className="mb-1 block">Total Study Time (hours)</label>
              <input
                type="number"
                name="total_studytime"
                value={formData.study_hours}
                onChange={handleInputChange}
                className="w-full rounded-md bg-[#334155] p-2 text-white"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Update Info
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
