import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowWidth: window.innerWidth,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
  },
});

export const { changeWindowWidth } = appSlice.actions;

export default appSlice.reducer;
