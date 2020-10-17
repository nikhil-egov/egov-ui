import React from "react";
import check from "../svg/check.svg";

const CheckBox = (props) => {
  return (
    <div className="checkbox-wrap">
      <input type="checkbox" />
      <p className="custom-checkbox">
        <img src={check} alt="" />
      </p>
      <p className="label">{props.label}</p>
    </div>
  );
};

export default CheckBox;
