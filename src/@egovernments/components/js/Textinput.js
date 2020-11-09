import React from "react";

const TextInput = (props) => {
  return (
    <React.Fragment>
      {props.isMandatory ? (
        <input
          type="text"
          className="card-input-error"
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      ) : (
        <input
          type="text"
          className="card-input"
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      )}
    </React.Fragment>
  );
};

export default TextInput;
