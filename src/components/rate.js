import React from "react";

export const Rate = () => {
  const rateComplaint = () => {
    alert("rateComplaint");
  };

  return (
    <span
      style={{
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <span onClick={rateComplaint} style={{ marginLeft: "2px" }}>
        Rate
      </span>
    </span>
  );
};
