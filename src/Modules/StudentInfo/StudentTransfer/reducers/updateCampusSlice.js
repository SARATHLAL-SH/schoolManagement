import { createSlice } from "@reduxjs/toolkit";
import { updateCampus } from "../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const updateCampusSlice = createSlice({
  name: "updateCampus",
  initialState,
  extraReducers: (builder) => {
    

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
export default updateCampusSlice.reducer;
