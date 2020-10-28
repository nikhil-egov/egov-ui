import React from "react";

const Body = (props) => {
  return (
    <div className="body-container" style={{ "min-height": "100vw" }}>
      {props.children}
    </div>
  );
};

export default Body;
