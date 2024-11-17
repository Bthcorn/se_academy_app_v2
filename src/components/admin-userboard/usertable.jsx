import React, { useState } from "react";
import { Pencil } from "lucide-react"; // Importing the Pencil icon for the edit button
import { useNavigate } from "react-router-dom";

const UserTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [expandedUserId, setExpandedUserId] = useState(null); // To track which user row is expanded
  const [isEditMode, setIsEditMode] = useState(false); // Track if edit mode is active
  const usersPerPage = 10;
  const navigate = useNavigate();

  // Function to filter and search users
  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((user) =>
      filterStatus
        ? user.status.toLowerCase() === filterStatus.toLowerCase()
        : true,
    )
    .filter((user) =>
      filterRole ? user.role.toLowerCase() === filterRole.toLowerCase() : true,
    );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Get the users for the current page
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  // Handler for changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handler for searching users
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Handler for filtering by status
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1); // Reset to page 1 when filtering
  };

  // Handler for filtering by role
  const handleRoleFilterChange = (event) => {
    setFilterRole(event.target.value);
    setCurrentPage(1); // Reset to page 1 when filtering
  };

  // Function to handle the "Edit" button click, navigating to the edit page with the user data
  const handleEdit = (user) => {
    navigate("edit", { state: { user } }); // Pass the user data to the edit page
  };

  // Toggle user details when "View Details" button is clicked
  const toggleDetails = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId); // Toggle between expanding/collapsing
  };

  // Toggle edit mode when Edit button is clicked
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode); // Toggle edit mode on and off
  };

  return (
    <div className="w-full rounded-lg bg-[#1E293B] p-4 shadow-lg">
      {/* Search, Filter, and Edit Controls */}
      <div className="mb-4 flex justify-between space-x-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded-md bg-[#2E3A47] px-4 py-2 text-white"
        />

        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="rounded-md bg-[#2E3A47] px-4 py-2 text-white"
        >
          <option value="">Filter by status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={filterRole}
          onChange={handleRoleFilterChange}
          className="rounded-md bg-[#2E3A47] px-4 py-2 text-white"
        >
          <option value="">Filter by role</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Graduated">Graduated</option>
        </select>

        {/* Edit Button */}
        <button
          onClick={toggleEditMode}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {isEditMode ? "Cancel Edit" : "Edit"}
        </button>
      </div>

      <table className="min-w-full table-auto text-white">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">#</th> {/* Index */}
            <th className="py-2">User</th>
            <th className="py-2">Role</th>
            <th className="py-2">Status</th>
            <th className="py-2">Email</th>
            <th className="py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <React.Fragment key={user.id}>
              <tr className="border-b border-gray-600">
                {/* Index column */}
                <td className="py-4">
                  {index + 1 + (currentPage - 1) * usersPerPage}
                </td>

                {/* User column with avatar and name */}
                <td className="inline-flex items-center py-4">
                  <img
                    className="mr-4 h-10 w-10 rounded-full"
                    src={user.avatar_image}
                    alt={user.username}
                  />
                  <div>
                    <p className="font-semibold">{user.username}</p>
                  </div>
                </td>

                {/* Role column */}
                <td className="py-4">
                  <p>{user.role}</p>
                </td>

                {/* Status column */}
                <td className="py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-sm ${
                      user.status.toLowerCase() === "active"
                        ? "bg-green-500"
                        : user.status.toLowerCase() === "inactive"
                          ? "bg-gray-500"
                          : "bg-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Email column */}
                <td className="py-4">
                  <p className="text-gray-400">{user.email}</p>
                </td>

                {/* Actions: View Details and Edit */}
                <td className="flex items-center justify-center space-x-4 py-4 text-center">
                  <button
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => toggleDetails(user.id)}
                  >
                    {expandedUserId === user.id
                      ? "Hide Details"
                      : "View Details"}
                  </button>

                  {isEditMode && (
                    <button
                      className="text-yellow-400 hover:text-yellow-500"
                      onClick={() => handleEdit(user)} // Navigate to edit page on click
                    >
                      <Pencil size={20} />
                    </button>
                  )}
                </td>
              </tr>

              {/* Conditionally render the expanded details row */}
              {expandedUserId === user.id && (
                <tr>
                  <td colSpan="6" className="bg-[#2E3A47] p-4 text-gray-200">
                    {/* Additional user details */}
                    <p>User ID: {user.id}</p>
                    <p>Level: {user.level}</p>
                    <p>Points: {user.points}</p>
                    <p>Total Study Time: {user.total_studytime} hours</p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        {/* Previous Page Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`mx-1 rounded-md bg-[#2E3A47] px-3 py-1 text-white hover:bg-[#3B4A58] ${
            currentPage === 1 && "cursor-not-allowed opacity-50"
          }`}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 rounded-md bg-[#2E3A47] px-3 py-1 text-white hover:bg-[#3B4A58] ${
              currentPage === i + 1 && "bg-blue-600"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`mx-1 rounded-md bg-[#2E3A47] px-3 py-1 text-white hover:bg-[#3B4A58] ${
            currentPage === totalPages && "cursor-not-allowed opacity-50"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default UserTable;
