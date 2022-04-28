import React from "react";

const SingleCountry = ({ flags: { png }, name: { common } }) => {
  const fontSize = (common) => {
    if (common.length > 28)
      return <p style={{ fontSize: "0.8rem" }}>{common}</p>;
    if (common.length > 35)
      return <p style={{ fontSize: "0.7rem" }}>{common}</p>;
    return <p>{common}</p>;
  };

  return (
    <div className="countries__single fadeIn">
      <div className="countries__single-flag">
        <img src={png} alt="countryFlag" loading="lazy" />
      </div>
      {fontSize(common)}
    </div>
  );
};

export default SingleCountry;
