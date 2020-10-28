import React from "react";

const RadioButtons = (props /*{ handleChange, options, selected }*/) => {
  const [selected, setSelected] = useState(null);

  function selectOption(value) {
    setSelected(value);
    props.selected(value);
  }
  return (
    <div className="radio-wrap">
      {/* <<<<<<< HEAD */}
      {props.options.map((option) => {
        if (props.optionsKey) {
          return (
            <div key={option[props.optionsKey]}>
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
              <label>{option[props.optionsKey]}</label>
            </div>
          );
        } else {
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
        }
        // =======
        //       {options.map((option) => {
        //         return (
        //           <div key={option}>
        //             <span className="radio-btn-wrap">
        //               <input
        //                 className="radio-btn"
        //                 type="radio"
        //                 value={option}
        //                 onChange={handleChange}
        //                 checked={selected === option}
        //               />
        //               <span className="radio-btn-checkmark"></span>
        //             </span>
        //             <label>{option}</label>
        //           </div>
        //         );
        // >>>>>>> 52e197fc1ef9f395d27f3a0afb1fdc22cde93c26
      })}
    </div>
  );
};

export default RadioButtons;
