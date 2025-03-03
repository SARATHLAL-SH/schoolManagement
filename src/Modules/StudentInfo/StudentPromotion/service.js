import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-toastify";

// Define the thunk to fetch student data
export const studentPromotion = createAsyncThunk(
  "promote/student",
  async (formData, { rejectWithValue }) => {
    const { fromClass, fromSection, toClass, toSection } = formData;
    console.log("====>", fromClass, fromSection, toClass, toSection);
    try {
      const response = await axiosInstance.put("/promote_students", {
        fromClass,
        fromSection,
        toClass,
        toSection,
      }); // Replace with your actual endpoint
      console.log(response.data);
      toast.success("Students Promoted Successfully");
      return response.data;
    } catch (error) {
      toast.error("failed to promote students");
      return rejectWithValue(
        error.response?.data?.message || "Failed to promote students"
      );
    }
  }
);
