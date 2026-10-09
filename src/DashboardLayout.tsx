import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function DashboardLayout() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen overflow-x-hidden">
      <Sidebar />
      
     
      <main className=" lg:ml-[250px] transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;