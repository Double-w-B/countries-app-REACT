import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGreeting: true,
  showCountryDetails: true,
};

const navbarBtnSlice = createSlice({
  name: "navbarBtn",
  initialState,
  reducers: {
    showGreeting: (state, action) => {
      state.isGreeting = action.payload;
    },
    hideCountryInfo: (state, action) => {
      state.showCountryDetails = false;
    },
    showCountryInfo: (state, action) => {
      state.showCountryDetails = true;
    },
  },
});

export const { showGreeting, hideCountryInfo, showCountryInfo } =
  navbarBtnSlice.actions;

export default navbarBtnSlice.reducer;
