import React from "react";

const Card = (props) => {
  return (
    <div className="card" style={{ padding: "1.2rem" }}>
      {props.children}
    </div>
  );
};

export default Card;
