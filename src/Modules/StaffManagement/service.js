import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

export const addEmployee = createAsyncThunk("addEmployee", async (data,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.post("/add_employee", data); 
    if(response.data){
    toast.success("Employee Aded Successfully");
    }
    return response.data;
  } catch (error) {
    toast.error("failed to Add Employee");
    return rejectWithValue(
      error.response?.data?.message || "Failed to Add Employee"
    );
  }
});


export const getAllEmployee = createAsyncThunk("get_employees", async () => {
  try {
    const response = await axiosInstance.get(`/get_employees`);
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    throw error.response?.data;
  }
});

export const editEmployee = createAsyncThunk("update_employees", async (data) => {
  try {
    const response = await axiosInstance.put(`/update_employee/${data.EmployeeId}`,data);
    toast.success("Employee Updated Successfully");
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    toast.error("Error Updating Employee");
    throw error.response?.data;
  }
}); 

export const updatePhoto = createAsyncThunk("update_photo", async ({EmployeeId,photo}) => {
  try {
    const response = await axiosInstance.put(`/update_employee_photo`,{EmployeeId,photo});
    if(response.data){
    toast.success("Employee Photo Updated Successfully");

    }
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    toast.error("Error Updating Employee");
    throw error.response?.data;
  }
});
