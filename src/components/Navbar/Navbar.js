import React, { useState, useMemo } from "react";
import routes from "../../routes";
import NavLink from "./Navlink";

export default function Navbar() {
  const [activePath, setActivePath] = useState("");
  const userRole = localStorage.getItem("role");

  // Filter routes based on the user's role
  const filteredRoutes = useMemo(() => {
    return routes?.filter((route) => {
      if (!route.role) return true; // Include public routes
      return route.role.includes(userRole); // Check if userRole exists in route.role
    });
  }, [userRole]);

  // Handle navigation click
  const handleNavClick = (path) => {
    setActivePath(path); // Set the active path
  };

  return (
    <div className="bg-blue-900 dark:bg-white flex flex-col fixed left-0 top-0 min-h-screen w-[250px] z-10 overflow-y-auto hide-scrollbar">
      <div className="flex flex-col bg-blue-950 dark:bg-white overflow-y-auto h-[calc(100vh-100px)] shadow-lg rounded-md hide-scrollbar mx-2 mt-12 pt-4">
        {filteredRoutes.map((route) => (
          <NavLink
            key={route.path}
            route={route}
            isActive={activePath === route.path}
            onClick={handleNavClick}
            userRole={userRole}
          />
        ))}
      </div>
    </div>
  );
}
