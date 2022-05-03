import React from "react";

const SingleCountry = ({ flags: { png }, name: { common } }) => {
  return (
    <div className="countries__single fadeIn">
      <div className="countries__single-flag">
        <img src={png} alt="countryFlag" loading="lazy" />
      </div>
      <p
        style={{
          fontSize:
            common.length > 24 && common.length < 35
              ? "0.8rem"
              : common.length > 35 && "0.7rem",
        }}
      >
        {common}
      </p>
    </div>
  );
};

export default SingleCountry;
