import { createSlice } from "@reduxjs/toolkit";
import { getFeebyId } from "../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const getFeebyIdSlice = createSlice({
  name: "getFeebyId",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFeebyId.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(getFeebyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = action.payload.message || null;
      })
      .addCase(getFeebyId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});
export default getFeebyIdSlice.reducer;
