import React from "react";
import loadingSpinner from "../../assets/Images/spinner.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loadingSpinner} alt="" />
    </div>
  );
};

export default Loading;
