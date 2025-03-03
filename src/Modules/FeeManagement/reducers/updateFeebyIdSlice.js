import { createSlice } from "@reduxjs/toolkit";
import { updateFeebyId } from "../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const updateFeebyIdSlice = createSlice({
  name: "updateFeebyId",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateFeebyId.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(updateFeebyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = action.payload.message || null;
      })
      .addCase(updateFeebyId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});
export default updateFeebyIdSlice.reducer;
