import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(state, action) {
      state.value = action.payload;
    },
  },
});

export default tokenSlice.reducer;

export const { setToken } = tokenSlice.actions;
