import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-toastify";

// Define the thunk to fetch student data
export const addStudent = createAsyncThunk("addStudent", async (data,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.post("/add_student", data); 
    console.log(response.data);
    toast.success("Students Aded Successfully");
    return response.data;
  } catch (error) {
    toast.error("failed to Add students");
    return rejectWithValue(
      error.response?.data?.message || "Failed to Add students"
    );
  }
});
