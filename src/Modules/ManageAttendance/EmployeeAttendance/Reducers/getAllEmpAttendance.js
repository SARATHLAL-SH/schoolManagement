import { createSlice } from "@reduxjs/toolkit";
import { getEmpAttendancebyDate } from "../../service";

const initialState = {
    data: null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    isSuccess: !!localStorage.getItem("token"),
    isError: false,
    message: null,
  };

  const getAllEmpAttendaceSlice = createSlice({
    name: "getAllEmpAttendance",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getEmpAttendancebyDate.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = null;
        });
        builder
          .addCase(getEmpAttendancebyDate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
            state.message = action.payload.message || null;
          })
          .addCase(getEmpAttendancebyDate.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error.message;
          });
      },
  })
  export default getAllEmpAttendaceSlice.reducer;