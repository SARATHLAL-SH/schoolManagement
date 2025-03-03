import { createSlice } from "@reduxjs/toolkit";
import { addStudent } from "../services";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const addStudentSlice = createSlice({
  name: "addStudent",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addStudent.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = "Campus updated successfully";;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });

  
    
  },
});
export default addStudentSlice.reducer;
