import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-toastify";

export const getStudentByCode = createAsyncThunk(
  "get_student_by_code",
  async (studentCode) => {
    console.log("studentCode", studentCode);
    try {
      const response = await axiosInstance.get(`/get_student/${studentCode}`);
      console.log("response of studentcode ",response.data)
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  }
);

export const updateCampus = createAsyncThunk(
  "updateCampus",
  async ({ studentCode, toCampus, grade }) => {
    console.log("studentCode", studentCode);
    try {
      const response = await axiosInstance.put(
        `/update_campus/${studentCode}`,
        { campus: toCampus,
          studentClass:grade
         }
      );
      const name = response.data?.student?.name;
      
      toast.success(`Student ${name.toUpperCase()} Campus Transferred Successfully`);
      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      toast.error(`Student Code  ${studentCode} not Match with any Student`);
      throw error.response?.data;
    }
  }
);
