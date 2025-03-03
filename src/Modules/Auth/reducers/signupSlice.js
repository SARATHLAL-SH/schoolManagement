import { createSlice } from "@reduxjs/toolkit";
import { signupAPI } from "../service";

const signupSlice = createSlice({
    name: "signup",
    initialState: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(signupAPI.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signupAPI.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        })
        .addCase(signupAPI.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload?.message || "Signup failed";
        });
    },
  });
  
  export default signupSlice.reducer;