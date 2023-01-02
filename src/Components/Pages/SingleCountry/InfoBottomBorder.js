import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCountryName } from "../../../redux/features/homePage/homePageSlice";
import { setConverterVisibility } from "../../../redux/features/converter/converterSlice";
import * as backgroundImgSlice from "../../../redux/features/backgroundImg/backgroundImgSlice";

const InfoBottomBorder = ({ borderCountries, setIsLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showCountries } = useSelector((store) => store.countries);
  const { windowWidth } = useSelector((store) => store.app);

  const setClassName = () => {
    return windowWidth < 769
      ? showCountries
        ? "country__border"
        : "country__border hide"
      : "country__border";
  };

  const setParagraphFontSize = (common) => {
    if (borderCountries.length > 10) return "0.85rem";
    if (common.length > 14) return "0.8rem";
  };

  const handleClick = (common) => {
    setIsLoading(true);
    navigate(`/countries/${common.split(" ").join("_")}`);
    dispatch(setCountryName(common));
    dispatch(backgroundImgSlice.clearUrl());
    dispatch(backgroundImgSlice.getImg(common));
    dispatch(setConverterVisibility(false));
  };

  return borderCountries.map((country) => {
    const {
      name: { common },
      flags: { png: flag },
      area,
    } = country;

    return (
      <div
        className={setClassName()}
        key={common.slice(0, 1) + area}
        onClick={() => handleClick(common)}
      >
        <div className="country__border__flag">
          <img src={flag} alt="flag" />
        </div>

        <p style={{ fontSize: `${setParagraphFontSize(common)}` }}>{common}</p>
      </div>
    );
  });
};

export default InfoBottomBorder;
