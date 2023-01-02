import React from "react";
import * as IconsModule from "../../../assets/Icons";

const InfoBottomMap = ({ foundCountry }) => {
  const {
    name: { common },
    maps: { googleMaps },
    borders,
    flag: flagIcon,
  } = foundCountry;

  return (
    <>
      <p>
        <img src={IconsModule.pointIco} alt="icon" />
        check on the map:
        <a href={googleMaps} target="_blank" rel="noopener noreferrer">
          {common} <span>{flagIcon}</span>
        </a>
      </p>
      <p>
        <img src={IconsModule.borderIco} alt="icon" />
        {borders
          ? `Borders with ${borders.length} countries:`
          : "There are no border countries."}
      </p>
    </>
  );
};

export default InfoBottomMap;
