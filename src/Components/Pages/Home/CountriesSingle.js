import React from "react";
import { useCallback } from "react";
import spinnerImg from "../../../assets/Images/spinner.gif";

const CountriesSingle = ({ flags: { png }, name: { common } }) => {
  const [imgSrc, setImgSrc] = React.useState(spinnerImg);

  const onLoad = useCallback(() => {
    setImgSrc(png);
  }, [png]);

  React.useEffect(() => {
    const img = new Image();
    img.src = png;
    img.onload = onLoad();
  }, [png, onLoad]);

  const setParagraphFontSize = () => {
    if (common.length > 18 && common.length < 30) return "0.8rem";
    if (common.length > 30) return "0.75rem";
  };

  return (
    <div className="countries__single fadeIn">
      <div className="countries__single-flag">
        <img src={imgSrc} alt={common + " flag image"} />
      </div>
      <p style={{ fontSize: setParagraphFontSize() }}>{common}</p>
    </div>
  );
};

export default CountriesSingle;
