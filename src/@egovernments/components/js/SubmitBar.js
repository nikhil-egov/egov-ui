import React from "react";

const SubmitBar = (props) => {
  // console.log("props SubmitBar :", props);

  return (
    <button className="submit-bar" type="submit" onClick={props.onSubmit}>
      <header>{props.label}</header>
    </button>
  );
};

export default SubmitBar;
