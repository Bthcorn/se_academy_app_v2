import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import AdminSideBar from "./admin-sidebar/AdminSideBar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid h-screen w-full md:grid-cols-[256px_1fr] lg:grid-cols-[256px_1fr]">
      {/* Sidebar that is always visible */}
      <div className="hidden lg:block">
        <AdminSideBar open={true} toggle={toggleSidebar} />
      </div>

      {/* Sidebar for mobile, controlled via state */}
      <div className="lg:hidden">
        <AdminSideBar open={isSidebarOpen} toggle={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <main className="container mx-auto flex h-full min-h-screen flex-1 p-4">
          <Outlet /> {/* Dynamic content rendered here */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
