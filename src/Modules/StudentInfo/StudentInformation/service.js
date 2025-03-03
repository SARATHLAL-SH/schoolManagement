import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";


export const getStudentsAll = createAsyncThunk("get_student", async () => {
    try {
      const response = await axiosInstance.get(`/get_student`);
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  });
