import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";
import Values from "values.js";

const SingleColor = ({ rgb, weight, index, hexColor, setList }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(",");
  const hexValue = `#${hexColor}`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue);
      }}
      onDoubleClick={() => {
        setAlert(false);
        let colors = new Values(hexValue).all(10);
        setList(colors);
        navigator.clipboard.writeText("");
      }}
      className={`${index > 10 ? "color color-light" : "color"}`}
      style={{
        backgroundColor: `rgb(${bcg})`,
        border: `${index === 10 ? "black solid 2px" : "none"}`,
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {alert && (
        <p
          className="alert"
          style={{ color: `${index > 10 ? "white" : "black"}` }}
        >
          copied to clipboard
        </p>
      )}
    </article>
  );
};

export default SingleColor;
