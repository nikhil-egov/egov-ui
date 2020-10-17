import React from "react";
import ArrowLeft from "../svg/arrowleft.svg";
const BackButton = (props) => {
  return (
    // <div className="back-btn">
    //     <label className="back-btn-pointer">&#x25c4;</label>
    //     <p>{props.children}</p>
    // </div>
    <div className="back-btn2">
      <img src={ArrowLeft} alt="Arrow Left" />
      <p>Back</p>
    </div>
  );
};

export default BackButton;
