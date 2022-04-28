import React from "react";
import { showLang, showCurr } from "../helpers";
import continentIco from "../Icons/continent.png";
import areaIco from "../Icons/area.png";
import populationIco from "../Icons/population.png";
import capitalIco from "../Icons/capital.png";
import languageIco from "../Icons/language.png";
import currencyIco from "../Icons/currency.png";

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
        <img src={continentIco} alt="icon" /> {region}{" "}
        {subregion ? "(" + subregion + ")" : undefined}
      </p>
      <p>
        <img src={areaIco} alt="icon" />
        area: {area
          .toString()
          .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")} km <sup>2</sup>
      </p>
      <p>
        <img src={populationIco} alt="icon" />
        population:{" "}
        {population.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")}
      </p>
      <p>
        <img src={capitalIco} alt="icon" />
        capital: {capital ? capital : "no capital"}
      </p>
      <p>
        <img src={languageIco} alt="icon" />
        {languages && Object.keys(languages).length > 1
          ? "languages:"
          : "language:"}{" "}
        {languages ? showLang(languages) : "no language"}
      </p>
      <p>
        <img src={currencyIco} alt="icon" />
        currency: {currencies ? showCurr(currencies) : "no local currency"}
      </p>
    </>
  );
};

export default InfoTopMain;
