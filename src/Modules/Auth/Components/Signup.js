import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAPI } from "../service"; // Replace with your signup API
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.signup
  );

  const onSubmit = (data) => {
    dispatch(signupAPI(data)); // Dispatch the signup API call
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message || "Signup successful");
      navigate("/login"); // Redirect to login page after successful signup
    }

    if (isError) {
      toast.error(message || "Signup failed, please try again.");
    }
  }, [isSuccess, isError, message, navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-blue-600 dark:bg-gray-900">
      <Toaster position="top-right" />
      <div className="flex flex-col w-96 p-10 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
            Signup
          </h1>
          <div className="my-4 border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Field (Dropdown Selector) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="accountant">Accountant</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="employee">Employee</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white font-bold bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
