import React from "react";

const InfoTopFlag = ({ foundCountry }) => {
  const {
    name: { common },
    flags: { png: flag },
  } = foundCountry;

  return (
    <>
      <div
        className="info-top--flag__img"
        style={{ backgroundImage: `url(${flag})` }}
      ></div>
      <p>The flag of {common}</p>
    </>
  );
};

export default InfoTopFlag;
