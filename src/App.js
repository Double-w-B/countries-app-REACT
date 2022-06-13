import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as PagesModule from "./Pages"
import SharedLayout from "./Components/SharedLayout";
import { getCountries } from "./features/countries/countriesSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCountries());
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<PagesModule.HomePage />} />
          <Route path="countries/:countryName" element={<PagesModule.CountryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
