import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="wrapper">
      <div class="loader">
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__ball"></div>
      </div>
    </div>
  );
};

export default Loader;
