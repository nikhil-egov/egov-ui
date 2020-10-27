import React, { useEffect, useState } from "react";
import ArrowDown from "../svg/arrowdown.svg";

const Dropdown = (props) => {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (props.set) {
      setSelectedOption(props.set);
    }
  }, [props.set]);

  function dropdownSwitch() {
    var current = dropdownStatus;
    setDropdownStatus(!current);
  }

  function onSelect(selectedOption) {
    setSelectedOption(selectedOption);
    setDropdownStatus(false);
    props.select(selectedOption);
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
          {props.option.map((option, index) => {
            return (
              <p key={index} onClick={() => onSelect(option)}>
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
