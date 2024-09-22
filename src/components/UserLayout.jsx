import React from "react";
import SideBar from "./sidebar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const UserLayout = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]
  // pass state of isSidebarOpen to Sidebar component
  return (
    <div className="flex h-dvh min-h-screen w-full flex-col">
      <div className="fixed left-[5.625rem] top-[-11.6875rem] h-[74.9375rem] w-[0rem] opacity-40 blur-[96px] sm:w-[20rem] md:w-[80rem]">
        <div className="absolute h-[37.6875rem] w-[37.6875rem] rounded-[37.6875rem] bg-[#CB3CFF]"></div>
        <div className="absolute bottom-0 right-0 h-[30.3125rem] w-[30.3125rem] rounded-[30.3125rem] bg-[#7F25FB]"></div>
      </div>
      <div className="flex h-auto flex-col lg:hidden">
        <SideBar open={isSidebarOpen} toggle={toggleSidebar} />
      </div>
      <div className="flex flex-1 flex-col">
        <Header toggle={toggleSidebar} />
        <main className="flex h-full min-h-screen flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
