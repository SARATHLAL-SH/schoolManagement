import axios from "axios";
import { server_url } from "../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAPI = createAsyncThunk("auth/login", async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${server_url}/auth/login`, data);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    throw error.response?.data;
  }
});

export const signupAPI = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    console.log("userdata", userData);
    try {
      const response = await axios.post(`${server_url}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
