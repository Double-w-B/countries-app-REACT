import React from "react";
import SingleCountry from "./SingleCountry";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeHover } from "../features/homePageFunc/homePageFuncSlice";
import { removeActive } from "../features/homePageFunc/homePageFuncSlice";
import { setCountryName } from "../features/homePageFunc/homePageFuncSlice";
import { getImg } from "../features/backgrImg/backgrImgSlice";

const AllCountries = ({ query }) => {
  const dispatch = useDispatch();

  const { countries } = useSelector((store) => store.countries);

  const findMatches = () => {
    return [...countries].filter((country) => {
      const regex = new RegExp(query, "gi");
      return country.name.common.match(regex);
    });
  };

  if (query) {
    return findMatches().map((country) => {
      const {
        name: { common },
        area,
      } = country;
      return (
        <Link
          to={`countries/${common.split(" ").join("_")}`}
          key={common.slice(0, 1) + area}
          onClick={() => {
            dispatch(setCountryName(common));
            dispatch(getImg(common));
            dispatch(removeHover());
            dispatch(removeActive());
          }}
        >
          <SingleCountry {...country} />
        </Link>
      );
    });
  }

  return [...countries]
    .sort((a, b) => {
      if (a.name.common.slice(0, 1) > b.name.common.slice(0, 1)) return 1;
      if (a.name.common.slice(0, 1) < b.name.common.slice(0, 1)) return 0;
      return -1;
    })
    .map((country) => {
      const {
        name: { common },
        area,
      } = country;

      return (
        <Link
          key={common.slice(0, 1) + area}
          to={`countries/${common.split(" ").join("_")}`}
          onClick={() => {
            dispatch(setCountryName(common));
            dispatch(getImg(common));
            dispatch(removeHover());
            dispatch(removeActive());
          }}
        >
          <SingleCountry {...country} />
        </Link>
      );
    });
};

export default AllCountries;
