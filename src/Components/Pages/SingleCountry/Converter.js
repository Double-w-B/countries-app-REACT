import React, { useState, useRef } from "react";
import { showAllCurrencies, findCurr } from "./utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "../../../assets/Icons";
import * as converterSlice from "../../../redux/features/converter/converterSlice";

const Converter = ({ currencies, borderCountries }) => {
  const dispatch = useDispatch();

  const { backgroundImgUrl } = useSelector((store) => store.backgroundImg);
  const { converterVis } = useSelector((store) => store.converter);
  const { windowWidth } = useSelector((store) => store.app);
  const { currencyFrom, currencyTo, amount, results } = useSelector(
    (store) => store.converter
  );

  const [change, setChange] = useState(false);
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const currFrom = useRef(null);
  const currTo = useRef(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

  React.useEffect(() => {
    const currencyFrom = currFrom?.current?.selectedOptions[0]?.innerText;
    const currencyTo = currTo?.current?.selectedOptions[0]?.innerText;

    setQuery("");
    dispatch(converterSlice.clearSettings());
    currencies && dispatch(converterSlice.setFrom(currencyFrom));
    currencies && dispatch(converterSlice.setTo(currencyTo));
    // eslint-disable-next-line
  }, [backgroundImgUrl, change]);

  const checkCurr = () => {
    return currencies
      ? currencyFrom
        ? `100 ${currencyFrom}`
        : "select the currency"
      : "no local currency";
  };

  const handleCurrencyChange = () => {
    setChange(!change);
    setQuery("");
    dispatch(converterSlice.clearSettings());
  };

  const handleAmountChange = (e) => {
    const regExp = /[^0-9.]/g;
    setQuery(e.target.value.replace(regExp, ""));
    dispatch(converterSlice.setAmount(e.target.value.replace(regExp, "")));
    dispatch(converterSlice.clearResults());
    setErrorMsg("");
  };

  const handleFromChange = (e) => {
    dispatch(converterSlice.setFrom(e.target.value));
    dispatch(converterSlice.clearResults());
    setErrorMsg("");
  };
  const handleToChange = (e) => {
    dispatch(converterSlice.setTo(e.target.value));
    dispatch(converterSlice.clearResults());
    setErrorMsg("");
  };

  const handleConvert = () => {
    const data = [currencyFrom, currencyTo, amount];
    if (errorMsg) return;

    if (!currencyFrom || !currencyTo) {
      return setErrorMsg("Please select currency");
    }

    if (!amount) {
      return setErrorMsg("Please add amount");
    }

    if (query && currencyFrom && currencyTo) {
      dispatch(converterSlice.getConversion(data));
    }
  };

  const converterClassName = () => {
    if (windowWidth < 769 && borderCountries.length > 0) {
      if (!converterVis) return "hide";
    }
  };

  return (
    <div className={`converter__calc ${converterClassName()}`}>
      <div className="converter__header">
        <img src={Icon.currencyConIco} alt="icon" />
        <p>LOCAL CURRENCY CONVERTER</p>
      </div>

      <label htmlFor="amount">
        Amount
        <input
          type="text"
          id="amount"
          maxLength="10"
          placeholder={checkCurr()}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = checkCurr())}
          value={query}
          onChange={handleAmountChange}
        />
      </label>

      <div className="converter__calc-currencies">
        <label htmlFor="from">
          From
          <select id="from" ref={currFrom} onChange={handleFromChange}>
            {currencies && !change && findCurr(currencies)}
            {currencies && change && showAllCurrencies()}
          </select>
        </label>

        <label htmlFor="to">
          To
          <select id="to" ref={currTo} onChange={handleToChange}>
            {currencies && !change && showAllCurrencies()}
            {currencies && change && findCurr(currencies)}
          </select>
        </label>
      </div>

      <button
        className="converter__calc-change"
        onClick={currencies && handleCurrencyChange}
      >
        <img src={Icon.exchangeIcon} alt="icon" />
      </button>

      <button className="converter__calc-convert" onClick={handleConvert}>
        Convert
      </button>

      <div className="converter__calc-result">
        {!errorMsg && results && <p>{results}</p>}
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default Converter;
