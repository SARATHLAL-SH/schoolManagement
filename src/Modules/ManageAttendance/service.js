import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

export const getAttendancebyDate = createAsyncThunk(
  "get_Attendance_by_Date",
  async (date) => {
    try {
      const response = await axiosInstance.get(`/getAttendanceByDate?date=${date}`);
console.log("getAttendance",response.data);
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  }
);

export const attendanceStatusChange = createAsyncThunk(
  "addAttendance",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/addAttendance`, data);
      console.log("response", response);
      if (response.data) {
        toast.success("Attendance Updated");
      }
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  }
);

export const groupAttendance = createAsyncThunk(
  "groupAttendance",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/bulkAttendanceupdate`, data);
      console.log("response", response);
      if (response.data) {
        toast.success("Attendance Updated");
      }
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  }
);

//Employee Attendance

export const getEmpAttendancebyDate = createAsyncThunk(
  "get_Emp_Attendance_by_Date",
  async (date) => {
    try {
      const response = await axiosInstance.get(`/getEmpAttendanceByDate?date=${date}`);
console.log("getEmpAttendance",response.data);
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  }
);

export const empAttendanceStatusChange = createAsyncThunk(
  "addEmpAttendance",
  async (data) => {
    console.log("data====>",data)
    try {
      const response = await axiosInstance.post(`/addEmpAttendance`, data);
      console.log("response", response);
      if (response.data) {
        toast.success("Employee Attendance Updated");
      }
      return response.data;
    } catch (error) {
      console.log("Attendance Updated error", error);
      throw error;
    }
  }
);
