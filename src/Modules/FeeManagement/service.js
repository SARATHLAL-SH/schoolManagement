import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

export const getAllFee = createAsyncThunk("getAllFee", async () => {
  try {
    const response = await axiosInstance.get(`/fee`);

    if (response.data) {
      console.log("successfully fecth student data");
    }
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    throw error.response?.data;
  }
});

export const getFeebyId = createAsyncThunk("getFeebyId", async (id) => {
  try {
    const response = await axiosInstance.get(`/fee/student/${id}`);

    if (response.data) {
      console.log("successfully fecth student dat");
    }
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    throw error.response?.data;
  }
});

export const updateFeebyId = createAsyncThunk("updateFeebyId", async (id) => {
  try {
    const response = await axiosInstance.put(`/fee/${id}`);
    console.log("response", response);
    if (response.data) {
      toast.success("Fee Updated");
    }
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    throw error.response?.data;
  }
});

export const feeCreation = createAsyncThunk("feeCreation", async (data) => {
  try {
    const response = await axiosInstance.post(`/fee`, data);
    console.log("response", response);
    if (response.data) {
      toast.success("Fee Record Created");
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.log("this is error", error.message);
    throw error.response?.data;
  }
});
