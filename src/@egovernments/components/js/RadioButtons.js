import React, { useState } from "react";

const RadioButtons = (props) => {
  const [selected, setSelected] = useState(null);

  function selectOption(value) {
    setSelected(value);
    props.selected(value);
  }
  return (
    <div className="radio-wrap">
      {props.options.map((option) => {
        return (
          <div key={option}>
            <span className="radio-btn-wrap">
              <input
                className="radio-btn"
                type="radio"
                value={option}
                checked={selected === option ? 1 : 0}
                onChange={() => selectOption(option)}
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
