import React from "react";
import { showLang, showCurr } from "../../helpers";
import * as IconsModule from "../../Icons";

const InfoTopMain = ({ foundCountry }) => {
  const {
    name: { common, official },
    coatOfArms: { png: coa },
    region,
    subregion,
    area,
    population,
    capital,
    languages,
    currencies,
  } = foundCountry;

  return (
    <>
      <h2
        style={{
          fontSize:
            common.length > 12 && window.innerWidth < 600
              ? "1.2rem"
              : undefined,
        }}
      >
        {common}
        {coa ? <img src={coa} alt="coatOfArms" title="Coat Of Arms" /> : ""}
      </h2>
      <h3>({official})</h3>
      <p>
        <img src={IconsModule.continentIco} alt="icon" /> {region}{" "}
        {subregion ? "(" + subregion + ")" : undefined}
      </p>
      <p>
        <img src={IconsModule.areaIco} alt="icon" />
        area: {area
          .toString()
          .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")} km <sup>2</sup>
      </p>
      <p>
        <img src={IconsModule.populationIco} alt="icon" />
        population:{" "}
        {population.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")}
      </p>
      <p>
        <img src={IconsModule.capitalIco} alt="icon" />
        capital: {capital ? capital : "no capital"}
      </p>
      <p>
        <img src={IconsModule.languageIco} alt="icon" />
        {languages && Object.keys(languages).length > 1
          ? "languages:"
          : "language:"}{" "}
        {languages ? showLang(languages) : "no language"}
      </p>
      <p>
        <img src={IconsModule.currencyIco} alt="icon" />
        currency: {currencies ? showCurr(currencies) : "no local currency"}
      </p>
    </>
  );
};

export default InfoTopMain;
