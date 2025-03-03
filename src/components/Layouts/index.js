import { Routes, Route } from "react-router-dom";
import routes from "../../routes";
import ProtectedRoute from "../ProtectedRoute";
import Navbar from "../Navbar/Navbar";
import ChartData from "../ChartData";
import TopNavbar from "../Navbar/TopNavbar";

export default function Layout() {
  const userRole = localStorage.getItem("role");
  const getRoutes = (routes) => {
  return routes.flatMap((route, key) => {
    if (route.subRoutes) {
      return route.subRoutes
        .filter((subRoute) => !subRoute.role || subRoute.role.includes(userRole))
        .map((subRoute, subKey) => (
          <Route
            path={subRoute.path}
            element={
              <ProtectedRoute requiredRole={subRoute.role}>
                {subRoute.component}
              </ProtectedRoute>
            }
            key={`${key}-${subKey}`}
          />
        ));
    }

    return (
      (!route.role || route.role.includes(userRole)) && (
        <Route
          path={route.path}
          element={
            <ProtectedRoute requiredRole={route.role}>
              {route.component}
            </ProtectedRoute>
          }
          key={key}
        />
      )
    );
  });
};

  return (
    <div className="flex flex-col">
      <div className="flex">
        {/* Navbar on the left side */}
        <div className="fixed top-0 left-0 h-full w-[250px] z-10">
          <Navbar />
        </div>

        {/* Content area */}
        <div className="ml-[250px] w-full flex flex-col">
          {/* TopNavbar below Navbar */}
          <div className="fixed top-0 left-[250px] w-[calc(100%-250px)] z-20">
            <TopNavbar />
          </div>

          {/* Main content */}
          <div className="mt-[40px] w-full p-4">
            <Routes>
              {getRoutes(routes)}

              {/* Default route */}
              <Route path="/" element={<ChartData />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
