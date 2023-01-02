import React from "react";
import { useDispatch } from "react-redux";
import * as Pages from "./Components/Pages";
import SharedLayout from "./Components/SharedLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCountries } from "./redux/features/countries/countriesSlice";
import { changeWindowWidth } from "./redux/features/functional/appSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const setWindowWidth = () => {
      dispatch(changeWindowWidth(window.innerWidth));
    };

    window.addEventListener("resize", setWindowWidth);
    return () => window.removeEventListener("resize", setWindowWidth);
  });

  React.useEffect(() => {
    dispatch(getCountries());
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Pages.HomePage />} />
          <Route path="countries/:country" element={<Pages.SingleCountry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
