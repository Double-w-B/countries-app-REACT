import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHover: false,
  isActive: false,
  selectedCountry: JSON.parse(sessionStorage.getItem("selectedCountry")) || "",
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    addHover: (state, action) => {
      state.isHover = true;
    },
    removeHover: (state, action) => {
      state.isHover = false;
    },
    addActive: (state, action) => {
      state.isActive = true;
    },
    removeActive: (state, action) => {
      state.isActive = false;
    },
    setCountryName: (state, action) => {
      state.selectedCountry = action.payload;
      sessionStorage.setItem("selectedCountry", JSON.stringify(action.payload));
    },
  },
});

export const {
  addHover,
  removeHover,
  addActive,
  removeActive,
  setCountryName,
} = homePageSlice.actions;

export default homePageSlice.reducer;
