import React from "react";
import spinnerImg from "../../../assets/Images/spinner.gif";

const CountriesLoading = () => {
  return (
    <div className="countries__all-loading">
      <img src={spinnerImg} alt="loading spinner" />
    </div>
  );
};

export default CountriesLoading;
