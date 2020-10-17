import React from "react";

const RadioButtons = (props) => {
  return (
    <div className="radio-wrap">
      {props.options.map((option) => {
        return (
          <div key={option}>
            <span className="radio-btn-wrap">
              <input className="radio-btn" type="radio" value={option} />
              <span className="radio-btn-checkmark"></span>
            </span>
            <label>{option}</label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButtons;
