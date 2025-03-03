import { createSlice } from "@reduxjs/toolkit";
import { getAllEmployee } from "../service";

const initialState = {
    data: null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    isSuccess: !!localStorage.getItem("token"),
    isError: false,
    message: null,
  };

  const getEmployeeSlice = createSlice({
    name: "getAllEmployee",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllEmployee.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = null;
        });
        builder
          .addCase(getAllEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
            state.message = action.payload.message || null;
          })
          .addCase(getAllEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error.message;
          });
      },
  })
  export default getEmployeeSlice.reducer;