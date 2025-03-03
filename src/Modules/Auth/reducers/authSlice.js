import { createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = null;
      state.token = null;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;

      localStorage.removeItem("token");

      if (action.payload && action.payload.redirect) {
        window.location.href = "/login"; // Full page reload for Axios interceptor
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAPI.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(loginAPI.fulfilled, (state, action) => {
        console.log("API Response Payload:", action.payload.user.role);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = action.payload.message;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem("token", action?.payload?.token);
        localStorage.setItem("userId", action.payload?.user.id);
        localStorage.setItem("role", action.payload?.user.role);
        localStorage.setItem("name", action.payload.user.name);
        localStorage.setItem("email", action.payload.user.email);
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
