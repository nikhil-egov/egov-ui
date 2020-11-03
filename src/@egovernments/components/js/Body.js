import React from "react";

const Body = (props) => {
  return (
    <div className="body-container" style={{ minHeight: "100vw" }}>
      {props.children}
    </div>
  );
};

export default Body;
