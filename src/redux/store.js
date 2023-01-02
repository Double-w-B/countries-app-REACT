import { configureStore } from "@reduxjs/toolkit";
import navbarBtnReducer from "./features/navbarBtn/navbarBtnSlice";
import homePageReducer from "./features/homePage/homePageSlice";
import countriesReducer from "./features/countries/countriesSlice";
import backgroundImgReducer from "./features/backgroundImg/backgroundImgSlice";
import converterReducer from "./features/converter/converterSlice";
import appSliceReducer from "./features/functional/appSlice";

export const store = configureStore({
  reducer: {
    navbarBtn: navbarBtnReducer,
    homePage: homePageReducer,
    countries: countriesReducer,
    backgroundImg: backgroundImgReducer,
    converter: converterReducer,
    app: appSliceReducer,
  },
});
