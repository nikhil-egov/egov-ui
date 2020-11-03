import React from "react";
import { Link } from "react-router-dom";
// import Reason from "../pages/ReopenComplaint/Reason";

export const ReOpen = ({ id }) => {
  // const reopenComplaint = () => {
  //   alert("reaopen");
  // };
  return (
    <>
      <Link to={`/reopen/reason/${id}`}>Re-Open</Link>
    </>
  );
};
