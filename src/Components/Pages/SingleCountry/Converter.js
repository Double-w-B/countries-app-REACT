import React, { useState, useRef } from "react";
import { showAllCurrencies, findCurr } from "./utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import * as IconsModule from "../../../assets/Icons";
import * as ConverterModule from "../../../redux/features/converter/converterSlice";

const Converter = ({ currencies, borderCountries }) => {
  const dispatch = useDispatch();
  const { currencyFrom, currencyTo, amount, results } = useSelector(
    (store) => store.converter
  );

  const [change, setChange] = useState(false);
  const [query, setQuery] = useState("");

  const currFrom = useRef(null);
  const currTo = useRef(null);

  const { backgrImgUrl } = useSelector((store) => store.backgrImg);
  const { converterVis } = useSelector((store) => store.converter);

  React.useEffect(() => {
    setQuery("");
    dispatch(ConverterModule.clearSettings(""));
    currencies &&
      dispatch(
        ConverterModule.setFrom(currFrom.current.selectedOptions[0].innerText)
      );
    currencies &&
      dispatch(
        ConverterModule.setTo(currTo.current.selectedOptions[0].innerText)
      );
    // eslint-disable-next-line
  }, [backgrImgUrl, change]);

  const checkCurr = () => {
    return currencies
      ? currencyFrom
        ? `100 ${currencyFrom}`
        : "select the currency"
      : "no local currency";
  };

  const handleChange = () => {
    setChange(!change);
    setQuery("");
    dispatch(ConverterModule.clearSettings(""));
  };

  const handleConvert = () => {
    query &&
      currencyFrom &&
      currencyTo &&
      dispatch(
        ConverterModule.getConversion([currencyFrom, currencyTo, amount])
      );
  };

  return (
    <div
      className={
        window.innerWidth < 769 && borderCountries.length > 0
          ? converterVis
            ? "converter__calc"
            : "converter__calc hide"
          : "converter__calc"
      }
    >
      <div className="converter__header">
        <img src={IconsModule.currencyConIco} alt="icon" />
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
          onChange={(e) => {
            setQuery(e.target.value.replace(/[^0-9.]/g, ""));
            dispatch(
              ConverterModule.setAmount(e.target.value.replace(/[^0-9.]/g, ""))
            );
          }}
        />
      </label>

      <div className="converter__calc-currencies">
        <label htmlFor="from">
          From
          <select
            name="from"
            id="from"
            ref={currFrom}
            onChange={(e) => dispatch(ConverterModule.setFrom(e.target.value))}
          >
            {currencies && !change && findCurr(currencies)}
            {currencies && change && showAllCurrencies()}
          </select>
        </label>

        <label htmlFor="to">
          To
          <select
            name="to"
            id="to"
            ref={currTo}
            onChange={(e) => {
              dispatch(ConverterModule.setTo(e.target.value));
            }}
          >
            {currencies && !change && showAllCurrencies()}
            {currencies && change && findCurr(currencies)}
          </select>
        </label>
      </div>

      <button
        className="converter__calc-change"
        onClick={currencies && handleChange}
      >
        <img src={IconsModule.exchangeIcon} alt="icon" />
      </button>
      <button className="converter__calc-convert" onClick={handleConvert}>
        Convert
      </button>
      <div className="converter__calc-result">
        {results ? results : undefined}
      </div>
    </div>
  );
};

export default Converter;
