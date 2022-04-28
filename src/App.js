import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryPage from "./Pages/CountryPage";
import HomePage from "./Pages/HomePage";
import SharedLayout from "./Components/SharedLayout";
import { getCountries } from "./features/countries/countriesSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    !JSON.parse(localStorage.getItem("allCountries")) &&
      dispatch(getCountries());
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="countries/:countryName" element={<CountryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
