import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../@egovernments/components/js/BackButton";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";

const ReasonPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  console.log("complaintId:", id);
  const TRANSLATION_KEY = "CS_REOPEN";
  const [selected, setSelected] = useState("");

  const onRadioChange = (e) => {
    let reopenDetails = Storage.get(`reopen.${id}`);
    Storage.set(`reopen.${id}`, { ...reopenDetails, reason: e.target.value });
    setSelected(e.target.value);
  };

  return (
    <Card>
      <BackButton>Back</BackButton>
      <CardHeader>Choose Complaint Type</CardHeader>
      <CardText>
        Select the option related to your complaint from the list given below.
        If the complaint type you are looking for is not listed select others.{" "}
      </CardText>
      <RadioButtons
        handleChange={onRadioChange}
        selected={selected}
        options={[
          t(`${TRANSLATION_KEY}_OPTION_ONE`),
          t(`${TRANSLATION_KEY}_OPTION_TWO`),
          t(`${TRANSLATION_KEY}_OPTION_THREE`),
          t(`${TRANSLATION_KEY}_OPTION_FOUR`),
        ]}
      />
      <Link to={`/complaint-reopen-upload-photo/${id}`}>
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default ReasonPage;
