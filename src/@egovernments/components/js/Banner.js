import React from "react";
import success from "../svg/success.svg";
import error from "../svg/error2.svg";

const Successful = (props) => {
  return (
    <div className="success-wrap">
      <header>{props.props.message}</header>
      <div>
        <img src={success} alt="successfull submition" />
        <h2>Complaint No.</h2>
        <p>{props.props.complaintNumber}</p>
      </div>
    </div>
  );
};

const Error = (props) => {
  return (
    <div className="error-wrap">
      <header>{props.props.message}</header>
      <img src={error} alt="error while submition" />
    </div>
  );
};

const Banner = (props) => {
  return props.successful ? (
    <Successful props={props} />
  ) : (
    <Error props={props} />
  );
};

export default Banner;
