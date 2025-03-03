import React from "react";
import {
  FaSearch,
  FaGlobe,
  FaHome,
  FaPlusCircle,
  FaHeart,
  FaEnvelope,
  FaFileAlt,
  FaUser,
  FaPowerOff,
  FaBell,
} from "react-icons/fa";

const TopNavbar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };
  const role = localStorage.getItem("role");
  console.log("role",role)
  const name = localStorage.getItem("name");
  
  return (
    <nav className="bg-blue-900 text-white flex items-center justify-between px-6 py-2 shadow-md">
      {/* Left Section: Search */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Student..."
          className="px-4 py-1 rounded-full focus:outline-none text-gray-700"
        />
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">
          <FaSearch className="text-white" />
        </button>
      </div>

      {/* Center Section: Buttons */}
      <div className="flex items-center gap-4">
        <button className="bg-pink-500 text-white px-4 py-1 rounded-full flex items-center gap-2 ">
          <FaGlobe className="text-white" /> English
        </button>
        <button className="bg-pink-500 text-white px-4 py-1 rounded-full flex items-center gap-2">
          <FaHome className="text-white" /> Main Campus
        </button>
      </div>

      {/* Right Section: Icons and Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icons */}
        <div className="flex items-center gap-4">
          <FaPlusCircle />
          <FaHeart />
          <FaEnvelope />
          <FaFileAlt />
          <FaBell />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 flex items-center gap-2">
          <FaUser />
          <span>{name || "Guest"}</span>
          <button
            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-2"
            onClick={logoutHandler}
          >
            <FaPowerOff />
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
