import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../helpers/useData";

const RadioButtons = (props /*{ handleChange, options, selected }*/) => {
  console.log("props RadioButtons:----->", props);
  let options = props.options;
  let data = useData(props.optionsData);
  console.log("data received:", data);
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  if (data.length > 0) {
    options = data;
  }

  function selectOption(value) {
    setSelected(value.serviceCode);
    props.selected(value);
  }

  return (
    <div className="radio-wrap">
      {options.map((option) => {
        return (
          <div key={option.name}>
            <span className="radio-btn-wrap">
              <input
                className="radio-btn"
                type="radio"
                value={option.name}
                checked={selected === option.name ? 1 : 0}
                onChange={() => selectOption(option)}
              />
              <span className="radio-btn-checkmark"></span>
            </span>
            <label>{t(option.i18nKey)}</label>
          </div>
        );
        // } else {
        //   return (
        //     <div key={option}>
        //       <span className="radio-btn-wrap">
        //         <input
        //           className="radio-btn"
        //           type="radio"
        //           value={option}
        //           checked={selected === option ? 1 : 0}
        //           onChange={() => selectOption(option)}
        //         />
        //         <span className="radio-btn-checkmark"></span>
        //       </span>
        //       <label>{option}</label>
        //     </div>
        //   );
        // }
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
