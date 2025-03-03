import { createSlice } from "@reduxjs/toolkit";
import { addBulkStudnet } from "../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const bulkStudentSlice = createSlice({
  name: "bulkStudent",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addBulkStudnet.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(addBulkStudnet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = "Bulk students added successfully";
      })
      .addCase(addBulkStudnet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default bulkStudentSlice.reducer;
