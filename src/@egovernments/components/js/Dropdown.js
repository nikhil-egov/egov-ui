import React, { useState } from "react";
import ArrowDown from "../svg/arrowdown.svg";

const Dropdown = (props) => {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  function dropdownSwitch() {
    var current = dropdownStatus;
    setDropdownStatus(!current);
  }

  function onSelect(selectedOption) {
    setSelectedOption(selectedOption);
    setDropdownStatus(false);
  }

  return (
    <div className="select-wrap">
      <div
        onClick={dropdownSwitch}
        className={dropdownStatus ? "select-active" : "select"}
      >
        {selectedOption ? (
          <p>{selectedOption}</p>
        ) : (
          <p>
            Select {props.label} {props.isMandatory ? "*" : null}
          </p>
        )}
        <img src={ArrowDown} alt="Arrow Down" />
      </div>
      {dropdownStatus && (
        <div className="options-card">
          {props.option.map((option) => {
            return (
              <p key={option} onClick={() => onSelect(option)}>
                {option}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
