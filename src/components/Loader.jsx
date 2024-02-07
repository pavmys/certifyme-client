import React from "react";
import "../styles/Loader.css";

function Loader(props) {
  return (
    <div className={props.className}>
      <span className="loader__span"></span>
    </div>
  );
}

export default Loader;
