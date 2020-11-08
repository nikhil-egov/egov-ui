import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Complaint from "../components/Complaint";

import { searchComplaints } from "../redux/actions";
import BackButton from "../@egovernments/components/js/BackButton";
import Header from "../@egovernments/components/js/Header";
import LanguageSelect from "../components/LanguageSelect";
import { useTranslation } from "react-i18next";

const ComplaintsPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { t } = useTranslation();

  const complaints = state.complaints.list;
  const getComplaints = useCallback(() => dispatch(searchComplaints()), [
    dispatch,
  ]);

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

  return (
    <>
      <BackButton>Back</BackButton>
      <Header>{t("CS_HOME_MY_COMPLAINTS")}</Header>
      <LanguageSelect />
      {complaints &&
        complaints.length > 0 &&
        complaints.map(({ service }, index) => (
          <div key={index}>
            <Complaint data={service} />
          </div>
        ))}
    </>
  );
};

export default ComplaintsPage;
