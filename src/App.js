import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Modules/Auth/Components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layouts";
import Auth from "./Modules/Auth";
import Unautherized from "./components/Unathorized/Unautherized";
import { ToastContainer } from "react-toastify";
import Signup from "./Modules/Auth/Components/Signup";

const App = () => {
 
  return (
    <>
    <Routes>
    
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/unautherized" element={<Unautherized />} />
      
    </Routes>
    
    </>
  );
};

export default App;
