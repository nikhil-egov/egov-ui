import React, { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BackButton from "../@egovernments/components/js/BackButton";
import Card from "../@egovernments/components/js/Card";
import Header from "../@egovernments/components/js/Header";
import CardSubHeader from "../@egovernments/components/js/CardSubHeader";
import { StatusTable } from "../@egovernments/components/js/StatusTable";
import {
  ConnectingCheckPoints,
  CheckPoint,
} from "../@egovernments/components/js/ConnectingCheckPoints";

import { selectComplaints } from "../selectors/complaint";
import { searchComplaints } from "../redux/actions";

const ComplaintDetailsPage = () => {
  let { t } = useTranslation();
  let { id } = useParams();
  const dispatch = useDispatch();
  const LOCALIZATION_KEY = "CS_COMPLAINT_DETAILS";
  const getComplaint = useCallback(
    () => dispatch(searchComplaints({ serviceRequestId: id })),
    [dispatch]
  );

  useEffect(() => {
    getComplaint();
  }, [getComplaint]);

  const state = useSelector((state) => state);
  const selectedComplaint = selectComplaints(state);
  let complaintDetails = {};
  if (selectedComplaint.length > 0) {
    complaintDetails = selectedComplaint[0].service;
  }

  let cityCode = () => state.cityCode.toUpperCase().replace(".", "_");

  // const sampleTableObject = {
  //   "Complaint No": "02/09/2020/051705",
  //   "Complaint Status": "Filed",
  //   "Filed Date": "1-Aug-2020",
  //   Address: "Back side Post Office Patiala Road Ajit Nagar Amritsar",
  // };

  const getFormatedAddress = ({
    landmark,
    buildingName,
    plotNo,
    street,
    locality,
  }) => {
    return `${landmark}, ${buildingName}, ${
      plotNo ? "Plot no-" + plotNo : ""
    }, ${street}, ${t(locality.code)}, ${t(`TENANT_TENANTS_${cityCode()}`)}`;
  };

  const getTableData = () => {
    let {
      serviceRequestId,
      applicationStatus,
      auditDetails,
      address,
    } = complaintDetails;
    let { createdTime } = auditDetails;
    let formattedAddress = getFormatedAddress(address);
    return {
      "Complaint No": serviceRequestId,
      "Complaint Status": applicationStatus,
      "Filed Date": createdTime,
      Address: formattedAddress,
    };
  };

  return (
    <>
      <BackButton>Back</BackButton>
      <Header>My Complaints</Header>
      {Object.keys(complaintDetails).length > 0 && (
        <>
          <Card>
            <CardSubHeader>
              {t(`SERVICEDEFS.${complaintDetails.serviceCode.toUpperCase()}`)}
            </CardSubHeader>
            <StatusTable dataObject={getTableData()}></StatusTable>
          </Card>
          <Card>
            <CardSubHeader>
              {t(`${LOCALIZATION_KEY}_COMPLAINT_TIMELINE`)}
            </CardSubHeader>
            {/* <StatusTable dataObject={getTableData()}></StatusTable> */}
            <ConnectingCheckPoints>
              <CheckPoint label="Pending for Assignment" isCompleted={true} />
              <CheckPoint label="Complaint Filed" info="12/08/2020" />
            </ConnectingCheckPoints>
          </Card>
        </>
      )}
    </>
  );
};

export default ComplaintDetailsPage;
