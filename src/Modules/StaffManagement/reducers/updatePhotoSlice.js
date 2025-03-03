import { createSlice } from "@reduxjs/toolkit";
import { updatePhoto } from "../service";

const initialState = {
  data: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isSuccess: !!localStorage.getItem("token"),
  isError: false,
  message: null,
};

const updatePhotoSlice = createSlice({
  name: "updatePhoto",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updatePhoto.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = action.payload.message || null;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});
export default updatePhotoSlice.reducer;
