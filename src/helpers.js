import { currency } from "./data/data";

export const showAllCurrencies = () => {
  return Object.keys(currency)
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .map((curr) => {
      return (
        <option key={curr} value={curr}>
          {curr}
        </option>
      );
    });
};

export const showCurr = (currencies) => {
  let currVal;
  for (const [key] of Object.entries(currency)) {
    if (key === Object.keys(currencies)[0])
      currVal = Object.values(currencies)[0];

    if (key === Object.keys(currencies)[1])
      currVal = Object.values(currencies)[1];
  }

  const { name, symbol } = currVal;
  return `${name} ${symbol === undefined ? "" : "(" + symbol + ")"}`;
};

export const findCurr = (currencies) => {
  for (const [key] of Object.entries(currency)) {
    if (key === Object.keys(currencies)[0]) {
      return <option key={key} value={key}>{key}</option>;
    }
    if (key === Object.keys(currencies)[1]) {
      return <option key={key} value={key}>{key}</option>;
    }
  }
};

export const showLang = (languages) => {
  const langVal = Object.values(languages);

  if (langVal.length > 1) {
    return `${langVal[0]}, ${langVal[1]}`;
  } else if (langVal.length > 2) {
    return `${langVal[0]}, ${langVal[1]}, ${langVal[2]}`;
  } else {
    return langVal[0];
  }
};
