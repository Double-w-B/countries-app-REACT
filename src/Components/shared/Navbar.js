import React from "react";
import logoImg from "../../assets/Images/logo.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as navbarBtnSlice from "../../redux/features/navbarBtn/navbarBtnSlice";
import * as converterSlice from "../../redux/features/converter/converterSlice";
import { showBorderCountries } from "../../redux/features/countries/countriesSlice";
import { setCountryName } from "../../redux/features/homePage/homePageSlice";
import { clearUrl } from "../../redux/features/backgroundImg/backgroundImgSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = window.location.pathname;

  const { selectedCountry } = useSelector((store) => store.homePage);
  const { isGreeting, showCountryDetails } = useSelector(
    (store) => store.navbarBtn
  );
  const [isLandscape, setIsLandscape] = React.useState(false);

  React.useEffect(() => {
    setIsLandscape(false);
  }, [location]);

  const handleClick = () => {
    if (location !== "/") {
      setIsLandscape(!isLandscape);
    }

    if (!selectedCountry) {
      isGreeting
        ? dispatch(navbarBtnSlice.showGreeting(false))
        : dispatch(navbarBtnSlice.showGreeting(true));
    }
    if (selectedCountry) {
      showCountryDetails
        ? dispatch(navbarBtnSlice.hideCountryInfo())
        : dispatch(navbarBtnSlice.showCountryInfo());
    }
  };

  const handleLinkClick = () => {
    dispatch(setCountryName(""));
    dispatch(navbarBtnSlice.showCountryInfo());
    dispatch(clearUrl());
    dispatch(converterSlice.setConverterVisibility(false));
    dispatch(showBorderCountries(true));
    dispatch(navbarBtnSlice.showGreeting(true));
    document.querySelector("#root").removeAttribute("style");
  };

  const setHeaderClassName = () => {
    if (location !== "/" && isLandscape) return "opacity";
    return undefined;
  };

  const setButtonText = () => {
    if (location === "/") return "about";
    if (showCountryDetails) return "landscape";
    return "info";
  };

  return (
    <header className={setHeaderClassName()}>
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          <img src={logoImg} alt="logo" />
        </Link>
      </div>
      <button>
        <span onClick={handleClick}>{setButtonText()}</span>
      </button>
    </header>
  );
};

export default Navbar;
