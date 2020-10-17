import React from "react";

const TextInput = (props) => {
  return (
    <React.Fragment>
      {props.isMandatory ? (
        <input
          type="text"
          className="card-input-error"
          placeholder={props.placeholder}
        />
      ) : (
        <input
          type="text"
          className="card-input"
          placeholder={props.placeholder}
        />
      )}
    </React.Fragment>
  );
};

export default TextInput;
