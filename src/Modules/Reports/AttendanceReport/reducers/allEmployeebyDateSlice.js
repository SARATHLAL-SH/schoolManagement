import { createSlice } from "@reduxjs/toolkit";
import { getAllEmployeeAttendanceDate } from "../service";

const initialState = {
    data: null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    isSuccess: !!localStorage.getItem("token"),
    isError: false,
    message: null,
  };

  const getAllEmployeeAttendancebyDateSlice = createSlice({
    name: "getAllEmployeeAttendancebyDate",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllEmployeeAttendanceDate.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = null;
        });
        builder
          .addCase(getAllEmployeeAttendanceDate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
            state.message = action.payload.message || null;
          })
          .addCase(getAllEmployeeAttendanceDate.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error.message;
          });
      },
  })
  export default getAllEmployeeAttendancebyDateSlice.reducer;