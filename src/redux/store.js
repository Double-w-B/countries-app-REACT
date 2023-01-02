import { configureStore } from "@reduxjs/toolkit";
import navbarBtnReducer from "./features/navbarBtn/navbarBtnSlice";
import homePageFuncReducer from "./features/homePageFunc/homePageFuncSlice";
import countriesReducer from "./features/countries/countriesSlice";
import backgrImgReducer from "./features/backgrImg/backgrImgSlice";
import converterReducer from "./features/converter/converterSlice";

export const store = configureStore({
  reducer: {
    navbarBtn: navbarBtnReducer,
    homePageFunc: homePageFuncReducer,
    countries: countriesReducer,
    backgrImg: backgrImgReducer,
    converter: converterReducer,
  },
});
