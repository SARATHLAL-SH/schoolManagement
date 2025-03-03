import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";


export const getAllEmployeeAttendanceDate = createAsyncThunk("getEmpAttendanceByDate", async (date) => {
    try {
      const response = await axiosInstance.get(`/getEmpAttendanceByDate?date=${date}`);
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  });

  export const getAllEmployeeAttendance = createAsyncThunk("getAllEmployeeAttendanceReport", async () => {
    try {
      const response = await axiosInstance.get(`/getAllEmployeeAttendanceReport`);
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  });
