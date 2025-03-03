import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";
import toast from "react-hot-toast";

export const addBulkStudnet = createAsyncThunk(
  "addBulkStudent",
  async (formData, { rejectWithValue }) => {
    console.log("formdata", formData);
    try {
      const response = await axiosInstance.post("/upload_students", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      if (response.data) {
        toast.success("Bulk students added successfully.....");
      }
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add bulk students"
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to add bulk students"
      );
    }
  }
);
