import axiosInstance from "../../../services/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const changeParentPassword = createAsyncThunk(
  "changePassword",
  async ({ email, newPassword }) => {
    console.log("this is email", email, newPassword);
    try {
      const response = await axiosInstance.post(`/reset-password`, {
        email,
        newPassword,
      });
      toast.success("Password changed successfully");
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  }
);

export const getUsers = createAsyncThunk("getUsers", async () => {
  try {
    const response = await axiosInstance.get(`/get_users`);
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    throw error.response?.data;
  }
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  try {
    const response = await axiosInstance.delete(`/delete_user/${id}`);
    toast.success("Deleted successfully");
    console.log("this is response", response.data);

    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    throw error.response?.data;
  }
});
