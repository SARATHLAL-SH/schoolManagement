import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
const email = localStorage.getItem("email");
console.log("email", email);

export const getChat = createAsyncThunk(
  "get_chat",
  async ({ teacherId, studentId }) => {
    try {
      const response = await axiosInstance.get(
        `/history/${teacherId}/${studentId}`
      );

      return response.data;
    } catch (error) {
      console.log("this is error", error.response?.data);
      throw error.response?.data;
    }
  }
);

export const chatHistory = createAsyncThunk(
  "chatHistory",
  async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/chat_history/${userId}`
      );

      return response.data;
    } catch (error) {
      console.log("chatHistory error", error.response?.data);
      throw error.response?.data;
    }
  }
);

export const getChildren = createAsyncThunk("getChildren", async (email) => {
  try {
    const response = await axiosInstance.get(`/getSudentbyMail/${email}`);
    console.log("response", response);
    if (response.data) {
      toast.success("Message Sent");
    }
    return response.data;
  } catch (error) {
    console.log("this is error", error.response?.data);
    throw error.response?.data;
  }
});
