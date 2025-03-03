import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavLink(props) {
  const { route,userRole } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Determine if the route or any subroute is active
  const isActive = location.pathname === route.path;
  const isSubRouteActive =
    route.subRoutes?.some((subRoute) => location.pathname === subRoute.path) ||
    false;

     // Filter subRoutes by role
  const filteredSubRoutes = route.subRoutes?.filter((subRoute) => {
    return !subRoute.role || subRoute.role.includes(userRole);
  }) || [];

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Toggle submenu visibility
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div
      className="w-full flex flex-col relative"
      onClick={() => {
        if (route.subRoutes) {
          toggleSubmenu();
        } else {
          handleNavigation(route.path);
        }
      }}
    >
      {/* Main Menu Item */}
      {!route.hidden && (
        <div
          className={`flex items-center px-3 py-2 cursor-pointer my-1 w-full rounded-md ${
            isActive || isSubRouteActive
              ? "bg-red-500 text-white"
              : "bg-transparent text-gray-200"
          } hover:bg-gray-900`}
        >
          <div className="flex items-center justify-between w-full">
            <span>{route.name}</span>
            {/* Notification Mark */}
            {isSubRouteActive && (
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping ml-2"></span>
            )}
          </div>
        </div>
      )}

      {/* Submenu */}
      {filteredSubRoutes.length > 0 && isSubmenuOpen && (
        <div className="flex flex-col w-full bg-gray-800 align-start pl-4 py-2 border-l-2 border-red-500">
        {filteredSubRoutes.map((subRoute) => (
            <div
              key={subRoute.path}
              className={`flex items-center gap-2 p-2 w-full cursor-pointer ${
                location.pathname === subRoute.path
                  ? "bg-red-600 text-white"
                  : "text-gray-200"
              } hover:bg-red-600`}
              onClick={(event) => {
                event.stopPropagation();
                handleNavigation(subRoute.path);
              }}
            >
              <div className="w-full">{subRoute.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
