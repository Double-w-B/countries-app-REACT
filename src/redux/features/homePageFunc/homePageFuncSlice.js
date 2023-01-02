import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHover: false,
  isActive: false,
  selectedCountry: JSON.parse(localStorage.getItem("selectedCountry")) || "",
};

const homePageFuncSlice = createSlice({
  name: "homePageFunc",
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
      localStorage.setItem("selectedCountry", JSON.stringify(action.payload));
    },
  },
});

export const {
  addHover,
  removeHover,
  addActive,
  removeActive,
  setCountryName,
} = homePageFuncSlice.actions;

export default homePageFuncSlice.reducer;
