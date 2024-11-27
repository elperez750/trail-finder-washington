import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import Footer from "../components/Footer"; // Import Footer component

const MainLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      {/* Main content area where child routes will be rendered */}
      <main className="flex-grow">
        <Outlet /> {/* This will render the nested routes */}
      </main>

      <Footer /> 
    </div>
  );
};

export default MainLayout;
