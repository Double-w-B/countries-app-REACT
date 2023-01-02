import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as PagesModule from "./Components/Pages";
import SharedLayout from "./Components/SharedLayout";
import { getCountries } from "./redux/features/countries/countriesSlice";

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
          <Route
            path="countries/:countryName"
            element={<PagesModule.SingleCountry />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
