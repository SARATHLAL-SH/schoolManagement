import { createSlice } from "@reduxjs/toolkit";
import { getStudentByCode, updateCampus } from "../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const getStudentByCodeSlice = createSlice({
  name: "getStudentsByCode",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getStudentByCode.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(getStudentByCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = action.payload.message || null;
      })
      .addCase(getStudentByCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });

    //updateCampus
    builder
      .addCase(updateCampus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(updateCampus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload; 
        state.message = "Campus updated successfully";
      })
      .addCase(updateCampus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Failed to update campus";
      });
  },
});
export default getStudentByCodeSlice.reducer;
