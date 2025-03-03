import { createSlice } from "@reduxjs/toolkit";
import { getStudentsAll } from "../service";

const initialState = {
    data: null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    isSuccess: !!localStorage.getItem("token"),
    isError: false,
    message: null,
  };

  const getStudentSlice = createSlice({
    name: "getStudentsAll",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getStudentsAll.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = null;
        });
        builder
          .addCase(getStudentsAll.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
            state.message = action.payload.message || null;
          })
          .addCase(getStudentsAll.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error.message;
          });
      },
  })
  export default getStudentSlice.reducer;