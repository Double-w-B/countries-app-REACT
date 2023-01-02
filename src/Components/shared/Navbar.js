import React from "react";
import logoImg from "../../assets/Images/logo.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showGreeting } from "../../redux/features/navbarBtn/navbarBtnSlice";
import { hideCountryInfo } from "../../redux/features/navbarBtn/navbarBtnSlice";
import { showCountryInfo } from "../../redux/features/navbarBtn/navbarBtnSlice";
import { setCountryName } from "../../redux/features/homePageFunc/homePageFuncSlice";
import { clearUrl } from "../../redux/features/backgrImg/backgrImgSlice";
import { setConverterVisibility } from "../../redux/features/converter/converterSlice";
import { showBorderCountries } from "../../redux/features/countries/countriesSlice";

const Navbar = () => {
  const { isGreeting, showCountryDetails } = useSelector(
    (store) => store.navbarBtn
  );
  const { selectedCountry } = useSelector((store) => store.homePageFunc);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!selectedCountry) {
      isGreeting ? dispatch(showGreeting(false)) : dispatch(showGreeting(true));
    }
    if (selectedCountry) {
      showCountryDetails
        ? dispatch(hideCountryInfo())
        : dispatch(showCountryInfo());
    }
  };

  return (
    <header
      className={window.location.pathname === "/" ? undefined : "opacity"}
    >
      <div className="logo">
        <Link
          to="/"
          onClick={() => {
            dispatch(setCountryName(""));
            dispatch(showCountryInfo());
            dispatch(clearUrl());
            dispatch(setConverterVisibility(false));
            dispatch(showBorderCountries(true));
            dispatch(showGreeting(true));
            document.querySelector("#root").removeAttribute("style");
          }}
        >
          <img src={logoImg} alt="logo" />
        </Link>
      </div>
      <div className="nav">
        <p onClick={handleClick}>
          {window.location.pathname === "/"
            ? "about"
            : showCountryDetails
            ? "hide"
            : "show"}
        </p>
      </div>
    </header>
  );
};

export default Navbar;
