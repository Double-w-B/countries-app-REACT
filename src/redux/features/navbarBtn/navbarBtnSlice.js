import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGreeting: true,
  isHide: false,
  showCountryDetails: true,
};

const navbarBtnSlice = createSlice({
  name: "navbarBtn",
  initialState,
  reducers: {
    showGreeting: (state, action) => {
      state.isGreeting = action.payload;
    },
    showInfo: (state, action) => {
      state.isHide = true;
    },
    hideInfo: (state, action) => {
      state.isHide = false;
    },
    hideCountryInfo: (state, action) => {
      state.showCountryDetails = false;
    },
    showCountryInfo: (state, action) => {
      state.showCountryDetails = true;
    },
  },
});

export const {
  showGreeting,
  showInfo,
  hideInfo,
  hideCountryInfo,
  showCountryInfo,
} = navbarBtnSlice.actions;

export default navbarBtnSlice.reducer;
