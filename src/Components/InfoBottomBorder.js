import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCountryName } from "../features/homePageFunc/homePageFuncSlice";
import { getImg, clearUrl } from "../features/backgrImg/backgrImgSlice";
import { setConvVis } from "../features/converter/converterSlice";

const InfoBottomBorder = ({ borderCountries }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showCountries } = useSelector((store) => store.countries);

  return borderCountries.map((country) => {
    const {
      name: { common },
      flags: { png: flag },
      area,
    } = country;

    return (
      <div
        className={
          window.innerWidth < 769
            ? showCountries
              ? "country__border"
              : "country__border hide"
            : "country__border"
        }
        key={common.slice(0, 1) + area}
        onClick={() => {
          navigate(`/countries/${common.split(" ").join("_")}`);
          dispatch(setCountryName(common));
          dispatch(clearUrl());
          dispatch(getImg(common));
          dispatch(setConvVis(false));
        }}
      >
        <div className="country__border__flag">
          <img src={flag} alt="flag" />
        </div>
        {borderCountries.length > 10 ? (
          <p style={{ fontSize: "0.8rem" }}>{common}</p>
        ) : (
          <p style={{ fontSize: common.length > 14 && "0.8rem" }}>{common}</p>
        )}
      </div>
    );
  });
};

export default InfoBottomBorder;
