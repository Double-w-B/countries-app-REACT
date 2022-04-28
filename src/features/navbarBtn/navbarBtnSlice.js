import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGreeting: true,
  isHide: false,
  showCountryDet: true,
};

const navbarBtnSlice = createSlice({
  name: "navbarBtn",
  initialState,
  reducers: {
    showGreeting: (state, action) => {
      state.isGreeting = true;
    },
    showAbout: (state, action) => {
      state.isGreeting = false;
    },
    showInfo: (state, action) => {
      state.isHide = true;
    },
    hideInfo: (state, action) => {
      state.isHide = false;
    },
    hideCountryInfo: (state, action) => {
      state.showCountryDet = false;
    },
    showCountryInfo: (state, action) => {
      state.showCountryDet = true;
    },
  },
});

export const {
  showGreeting,
  showAbout,
  showInfo,
  hideInfo,
  hideCountryInfo,
  showCountryInfo,
} = navbarBtnSlice.actions;

export default navbarBtnSlice.reducer;
