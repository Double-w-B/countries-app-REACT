import React from "react";
import SingleCountry from "./CountriesSingle";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getImg } from "../../../redux/features/backgroundImg/backgroundImgSlice";
import * as homePageSlice from "../../../redux/features/homePage/homePageSlice";

const CountriesAll = ({ query }) => {
  const dispatch = useDispatch();

  const { countries } = useSelector((store) => store.countries);

  const sortedCountries = [...countries].sort((a, b) =>
    a.name.common === b.name.common ? 0 : a.name.common < b.name.common ? -1 : 1
  );

  const findMatches = sortedCountries.filter((country) => {
    const regex = new RegExp(query, "gi");
    return country.name.common.match(regex);
  });

  if (query) {
    if (findMatches.length < 1) {
      return <p class="no-matches">No matches found for your search</p>;
    }

    return findMatches.map((country) => {
      const {
        name: { common },
        area,
      } = country;
      return (
        <Link
          to={`countries/${common.split(" ").join("_")}`}
          key={common.slice(0, 1) + area}
          onClick={() => {
            dispatch(homePageSlice.setCountryName(common));
            dispatch(getImg(common));
            dispatch(homePageSlice.removeHover());
            dispatch(homePageSlice.removeActive());
          }}
        >
          <SingleCountry {...country} />
        </Link>
      );
    });
  }

  return sortedCountries.map((country) => {
    const {
      name: { common },
      area,
    } = country;

    return (
      <Link
        key={common.slice(0, 1) + area}
        to={`countries/${common.split(" ").join("_")}`}
        onClick={() => {
          dispatch(homePageSlice.setCountryName(common));
          dispatch(getImg(common));
          dispatch(homePageSlice.removeHover());
          dispatch(homePageSlice.removeActive());
        }}
      >
        <SingleCountry {...country} />
      </Link>
    );
  });
};

export default CountriesAll;
