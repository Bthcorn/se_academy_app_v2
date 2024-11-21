import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./admin-sidebar/AdminSideBar";
import { useTheme } from "./ThemeContext"; // Import ThemeContext to access darkMode

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { darkMode } = useTheme(); // Access darkMode from ThemeContext

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`grid h-screen w-full md:grid-cols-[256px_1fr] lg:grid-cols-[256px_1fr] transition-colors duration-300 ease-in-out ${
        darkMode
          ? "bg-secondary text-secondary-foreground"
          : "bg-light-background text-light-foreground"
      }`}
    >
      {/* Sidebar that is always visible */}
      <div className="hidden lg:block">
        <AdminSideBar open={true} toggle={toggleSidebar} />
      </div>

      {/* Sidebar for mobile, controlled via state */}
      <div className="lg:hidden">
        <AdminSideBar open={isSidebarOpen} toggle={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="container mx-auto flex-1 p-4">
          <Outlet /> {/* Dynamic content rendered here */}
        </main>

        {/* Footer dynamically styled */}
        <footer
          className={`p-4 transition-colors duration-300 ease-in-out ${
            darkMode
              ? "bg-secondary text-secondary-foreground"
              : "bg-light-background text-light-foreground"
          }`}
        >
          <div className="container mx-auto text-center">
            <p>© 2024 SE Academy. All rights reserved.</p>
            <p>Software can change the world.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
