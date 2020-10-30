import React from "react";

const SubmitBar = (props) => {
  console.log("props SubmitBar :", props);

  return (
    <div className="submit-bar" onClick={() => props.onSubmit(props)}>
      <header>{props.label}</header>
    </div>
  );
};

export default SubmitBar;
