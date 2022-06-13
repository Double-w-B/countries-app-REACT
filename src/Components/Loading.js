import React from "react";
import spinnerImg from "../Images/spinner.gif";

const Loading = () => {
  return (
    <div className="countries__all-loading">
      <img src={spinnerImg} alt="loading spinner" />
    </div>
  );
};

export default Loading;
