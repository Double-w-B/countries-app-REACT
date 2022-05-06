import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoTopMain from "../Components/InfoTopMain";
import InfoTopFlag from "../Components/InfoTopFlag";
import InfoBottomMap from "../Components/InfoBottomMap";
import InfoBottomBorder from "../Components/InfoBottomBorder";
import Converter from "../Components/Converter";
import { setCountryName } from "../features/homePageFunc/homePageFuncSlice";
import {
  showCountryInfo,
  showGreeting,
} from "../features/navbarBtn/navbarBtnSlice";
import { clearUrl } from "../features/backgrImg/backgrImgSlice";
import { setConverterVisibility } from "../features/converter/converterSlice";
import { showBorderCountries } from "../features/countries/countriesSlice";

const CountryPage = () => {
  const { countries, showCountries } = useSelector((store) => store.countries);
  const { selectedCountry } = useSelector((store) => store.homePageFunc);
  const { showCountryDetails } = useSelector((store) => store.navbarBtn);
  const { backgrImgUrl } = useSelector((store) => store.backgrImg);
  const { converterVis } = useSelector((store) => store.converter);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let borderCountries = [];

  React.useEffect(() => {
    if (backgrImgUrl) {
      document.querySelector(
        "#root"
      ).style.backgroundImage = `url(${backgrImgUrl})`;
    }
  }, [backgrImgUrl]);

  React.useEffect(() => {
    window.onpopstate = () => {
      document.querySelector("#root").removeAttribute("style");
      dispatch(setCountryName(""));
      dispatch(showCountryInfo());
      dispatch(clearUrl());
      dispatch(setConverterVisibility(false));
      dispatch(showBorderCountries(true));
      dispatch(showGreeting(true));
      navigate("/");
    };
  });

  React.useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth > 769 && (!showCountries || !converterVis)) {
        dispatch(showBorderCountries(true));
        dispatch(setConverterVisibility(true));
      }

      if (
        window.innerWidth < 769 &&
        borderCountries &&
        showCountries &&
        converterVis
      ) {
        dispatch(showBorderCountries(true));
        dispatch(setConverterVisibility(false));
      }
    };

    window.addEventListener("resize", checkWindowSize);

    return () => window.removeEventListener("resize", checkWindowSize);
  });

  const foundCountry = countries.find((country) => {
    return country.name.common === selectedCountry;
  });

  const { currencies, borders } = foundCountry;

  borders &&
    // eslint-disable-next-line
    countries.map((country) => {
      borders.some(
        (border) => country.cca3 === border && borderCountries.push(country)
      );
    });

  return (
    <>
      <div
        className={
          borderCountries.length > 10
            ? showCountryDetails
              ? backgrImgUrl
                ? "selected__country extra-width"
                : "selected__country extra-width visibility"
              : "selected__country extra-width hide"
            : showCountryDetails
            ? backgrImgUrl
              ? "selected__country"
              : "selected__country visibility"
            : "selected__country hide"
        }
      >
        <div className="info-top">
          <div className="info-top--main">
            <InfoTopMain foundCountry={foundCountry} />
          </div>
          <div className="info-top--flag">
            <InfoTopFlag foundCountry={foundCountry} />
          </div>
        </div>

        <div className="info-bottom">
          <div
            className={
              window.innerWidth < 769
                ? showCountries && borderCountries.length > 0
                  ? "info-bottom--map"
                  : "info-bottom--map short"
                : "info-bottom--map"
            }
          >
            <InfoBottomMap foundCountry={foundCountry} />

            <div
              className={
                borderCountries.length > 10
                  ? showCountries
                    ? "info-bottom--border__countries countries-length"
                    : "info-bottom--border__countries countries-length hide"
                  : showCountries
                  ? "info-bottom--border__countries"
                  : "info-bottom--border__countries hide"
              }
            >
              <InfoBottomBorder borderCountries={borderCountries} />

              <div
                className={
                  window.innerWidth < 769
                    ? showCountries
                      ? "countries-btn-container"
                      : "countries-btn-container visible"
                    : "countries-btn-container"
                }
              >
                <button
                  className="show-countries"
                  onClick={() => {
                    dispatch(setConverterVisibility(false));
                    dispatch(showBorderCountries(true));
                  }}
                >
                  countries
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              window.innerWidth < 769 && borderCountries.length > 0
                ? converterVis
                  ? "info-bottom--converter"
                  : "info-bottom--converter hide"
                : "info-bottom--converter"
            }
          >
            <div
              className={
                window.innerWidth < 769 && borderCountries.length > 0
                  ? converterVis
                    ? "converter-btn-container"
                    : "converter-btn-container visible"
                  : "converter-btn-container"
              }
            >
              <button
                className="show-converter"
                onClick={() => {
                  dispatch(setConverterVisibility(true));
                  dispatch(showBorderCountries(false));
                }}
              >
                converter
              </button>
            </div>
            <Converter
              currencies={currencies}
              borderCountries={borderCountries}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryPage;
