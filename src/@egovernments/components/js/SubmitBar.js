import React from "react";

const SubmitBar = (props) => {
  return (
    <div className="submit-bar" onClick={props.onSubmit}>
      <header>{props.label}</header>
    </div>
  );
};

export default SubmitBar;
