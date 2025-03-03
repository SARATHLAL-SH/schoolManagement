import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, isSuccess, isError, message, token } = useSelector(
    (state) => state.login
  );

  const onSubmit = (data) => {
    dispatch(loginAPI(data));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message || "Login successful");
      if (localStorage.getItem("token") != null) {
        navigate("/");
      }
    }

    if (isError) {
      toast.error(message || "Invalid credentials, please try again.");
    }
  }, [isSuccess, isError, message, navigate]);
  return (
    <div className="flex items-center justify-center w-full h-screen bg-blue-600 dark:bg-gray-900">
      <Toaster position="top-right" />
      <div className="flex flex-col w-96 p-10 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
            Login
          </h1>
          <div className="my-4 border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer ID
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("customerId", {
                required: "CustomerId is required",
              })}
            />
            {errors.customerId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customerId.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2 text-blue-500 focus:ring-blue-500"
              {...register("rememberMe")}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white font-bold bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
          <div onClick={() => navigate("/signup")} className="text-center mt-4">
          <p className="text-blue-600 hover:text-blue-900">Register Here</p>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
