import { createSlice } from "@reduxjs/toolkit";
import { groupAttendance } from "../../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const groupAttendanceSlice = createSlice({
  name: "groupAttendance",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(groupAttendance.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(groupAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = action.payload.message || null;
      })
      .addCase(groupAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});
export default groupAttendanceSlice.reducer;
