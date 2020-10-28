import React from "react";

const CardCaption = (props) => {
  return (
    <label
      className="card-caption"
      style={{ fontWeight: "600", color: "#000" }}
    >
      {props.children}
    </label>
  );
};

export default CardCaption;
