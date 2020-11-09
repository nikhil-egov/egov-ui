import React from "react";
import ArrowLeft from "../svg/arrowleft.svg";
import { useTranslation } from "react-i18next";

const BackButton = (props) => {
  const { t } = useTranslation();
  return (
    // <div className="back-btn">
    //     <label className="back-btn-pointer">&#x25c4;</label>
    //     <p>{props.children}</p>
    // </div>
    // <div className="back-btn2" onClick={props.back}>
    <div className="back-btn2" onClick={props.onClick}>
      <img src={ArrowLeft} alt="Arrow Left" />
      <p>{t("TL_COMMON_BUTTON_BACK")}</p>
    </div>
  );
};

export default BackButton;
