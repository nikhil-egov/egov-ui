import React from "react";

const RadioButtons = ({ handleChange, options, selected }) => {
  return (
    <div className="radio-wrap">
      {options.map((option) => {
        console.log("option---->", option, "selected--->", selected);
        return (
          <div key={option}>
            <span className="radio-btn-wrap">
              <input
                className="radio-btn"
                type="radio"
                value={option}
                onChange={handleChange}
                checked={selected === option}
              />
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
