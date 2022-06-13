import React from "react";
import { useCallback } from "react";
import spinnerImg from "../Images/spinner.gif";

const SingleCountry = ({ flags: { png }, name: { common } }) => {
  const [imgSrc, setImgSrc] = React.useState(spinnerImg);

  const onLoad = useCallback(() => {
    setImgSrc(png);
  }, [png]);

  React.useEffect(() => {
    const img = new Image();
    img.src = png;
    img.onload = onLoad();
  }, [png, onLoad]);

  return (
    <div className="countries__single fadeIn">
      <div className="countries__single-flag">
        <img
          src={imgSrc}
          alt={common + " flag image which leads to country information"}
        />
      </div>{" "}
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
