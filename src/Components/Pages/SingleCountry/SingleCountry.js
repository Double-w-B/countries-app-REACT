import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Component from "../SingleCountry";
import { setCountryName } from "../../../redux/features/homePage/homePageSlice";
import * as navbarBtnSlice from "../../../redux/features/navbarBtn/navbarBtnSlice";
import { clearUrl } from "../../../redux/features/backgroundImg/backgroundImgSlice";
import { setConverterVisibility } from "../../../redux/features/converter/converterSlice";
import { showBorderCountries } from "../../../redux/features/countries/countriesSlice";
import Loading from "../../shared/Loading";

const SingleCountry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { countries, showCountries } = useSelector((store) => store.countries);
  const { selectedCountry } = useSelector((store) => store.homePage);
  const { showCountryDetails } = useSelector((store) => store.navbarBtn);
  const { converterVis } = useSelector((store) => store.converter);
  const { windowWidth } = useSelector((store) => store.app);
  const { backgroundImgUrl, isBackgroundImgLoading } = useSelector(
    (store) => store.backgroundImg
  );

  let borderCountries = [];
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isBackgroundImgLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBackgroundImgLoading]);

  React.useEffect(() => {
    if (backgroundImgUrl) {
      const url = `url(${backgroundImgUrl})`;
      document.querySelector("#root").style.backgroundImage = url;
    }
  }, [backgroundImgUrl]);

  React.useEffect(() => {
    window.onpopstate = () => {
      document.querySelector("#root").removeAttribute("style");
      dispatch(setCountryName(""));
      dispatch(navbarBtnSlice.showCountryInfo());
      dispatch(clearUrl());
      dispatch(setConverterVisibility(false));
      dispatch(showBorderCountries(true));
      dispatch(navbarBtnSlice.showGreeting(true));
      navigate("/");
    };
  });

  React.useEffect(() => {
    if (windowWidth > 769 && (!showCountries || !converterVis)) {
      dispatch(showBorderCountries(true));
      dispatch(setConverterVisibility(true));
    }

    if (windowWidth < 769 && borderCountries && showCountries && converterVis) {
      dispatch(showBorderCountries(true));
      dispatch(setConverterVisibility(false));
    }
    // eslint-disable-next-line
  }, [windowWidth]);

  const foundCountry = countries?.find((country) => {
    return country.name.common === selectedCountry;
  });

  const { currencies, borders } = foundCountry;

  if (borders) {
    countries?.map((country) => {
      return borders.some(
        (border) => country.cca3 === border && borderCountries.push(country)
      );
    });
  }

  /* ClassNames functions - start */
  const selectedCountryClass = () => {
    if (borderCountries.length > 10) {
      if (showCountryDetails) {
        if (backgroundImgUrl) return "extra-width";
        return "extra-width visibility";
      }
      return "extra-width hide";
    }

    if (showCountryDetails) {
      if (backgroundImgUrl) return "";
      return "visibility";
    }
    return "hide";
  };

  const infoBottomMapClass = () => {
    if (windowWidth < 769) {
      if (showCountries && borderCountries.length > 0) return "";
      return "short";
    }
  };

  const borderCountriesClass = () => {
    if (borderCountries.length > 10) {
      if (showCountries) return "countries-length";
      return "countries-length hide";
    }

    if (!showCountries) return "hide";
  };

  const countriesBtnContainerClass = () => {
    if (windowWidth < 769) {
      if (!showCountries) return "visible";
    }
  };

  const converterClass = () => {
    if (windowWidth < 769 && borderCountries.length > 0) {
      if (!converterVis) return "hide";
    }
  };

  const converterBtnContainerClass = () => {
    if (windowWidth < 769 && borderCountries.length > 0) {
      if (!converterVis) return "visible";
    }
  };
  /* ClassNames functions - start */

  const handleButtonsClick = (target) => {
    if (target === "countries") {
      dispatch(setConverterVisibility(false));
      dispatch(showBorderCountries(true));
      return;
    }

    dispatch(setConverterVisibility(true));
    dispatch(showBorderCountries(false));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`selected__country ${selectedCountryClass()}`}>
      <div className="info-top">
        <div className="info-top--main">
          <Component.InfoTopMain foundCountry={foundCountry} />
        </div>
        <div className="info-top--flag">
          <Component.InfoTopFlag foundCountry={foundCountry} />
        </div>
      </div>

      <div className="info-bottom">
        <div className={`info-bottom--map ${infoBottomMapClass()}`}>
          <Component.InfoBottomMap foundCountry={foundCountry} />

          <div
            className={`info-bottom--border__countries ${borderCountriesClass()}`}
          >
            <Component.InfoBottomBorder
              borderCountries={borderCountries}
              setIsLoading={setIsLoading}
            />

            <div
              className={`countries-btn-container ${countriesBtnContainerClass()}`}
            >
              <button
                className="show-countries"
                onClick={() => handleButtonsClick("countries")}
              >
                countries
              </button>
            </div>
          </div>
        </div>
        <div className={`info-bottom--converter ${converterClass()}`}>
          <div
            className={`converter-btn-container ${converterBtnContainerClass()}`}
          >
            <button
              className="show-converter"
              onClick={() => handleButtonsClick("converter")}
            >
              converter
            </button>
          </div>
          <Component.Converter
            currencies={currencies}
            borderCountries={borderCountries}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCountry;
