import React, { useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import TextArea from "../../@egovernments/components/js/TextArea";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";
import LinkLabel from "../../@egovernments/components/js/LinkLabel";
import { useTranslation } from "react-i18next";

const Details = (props) => {
  const [details, setDetails] = useState(null);
  let { t } = useTranslation();

  function submitComplaint() {
    props.submitComplaint(details);
  }

  function textInput(e) {
    setDetails(e.target.value);
  }

  return (
    <Card>
      {/* <CardHeader>Provide Additional Details</CardHeader> */}
      <CardHeader>{t("CS_ADDCOMPLAINT_PROVIDE_ADDITIONAL_DETAILS")}</CardHeader>
      <CardText>
        {/* If you think apart from information provided till now additional details
        are required to resolve complaint, provide it below: */}
        {t("CS_ADDITIONAL_DETAILS_TEXT")}
      </CardText>
      <TextArea onChange={textInput}></TextArea>
      <Link to="/create-complaint/submission" onClick={submitComplaint}>
        <SubmitBar
          label={t("CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_SUBMIT_COMPLAINT")}
        />
      </Link>
      {props.skip ? (
        <Link to="/create-complaint/submission">
          <div className="skipButton">
            <LinkLabel> {t("CORE_COMMON_SKIP_CONTINUE")}</LinkLabel>
          </div>
        </Link>
      ) : null}
    </Card>
  );
};

export default Details;
