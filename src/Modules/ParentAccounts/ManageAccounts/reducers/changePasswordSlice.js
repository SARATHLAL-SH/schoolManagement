import { createSlice } from "@reduxjs/toolkit";
import { changeParentPassword } from "../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const changeParentPasswordSlice = createSlice({
  name: "changeParentPassword",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changeParentPassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(changeParentPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = "Bulk students added successfully";
      })
      .addCase(changeParentPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default changeParentPasswordSlice.reducer;
 