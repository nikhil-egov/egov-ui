import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BackButton from "../@egovernments/components/js/BackButton";
import Card from "../@egovernments/components/js/Card";
import Header from "../@egovernments/components/js/Header";
import CardSubHeader from "../@egovernments/components/js/CardSubHeader";
import { StatusTable } from "../@egovernments/components/js/StatusTable";
import TextArea from "../@egovernments/components/js/TextArea";
import SubmitBar from "../@egovernments/components/js/SubmitBar";
import {
  ConnectingCheckPoints,
  CheckPoint,
} from "../@egovernments/components/js/ConnectingCheckPoints";

import { selectComplaints } from "../selectors/complaint";
import { fetchBusinessServiceById, searchComplaints } from "../redux/actions";
import { selectWorkflow } from "../selectors/processInstance";
import useComplaintHistory from "../hooks/useComplaintHistory";
import { Storage } from "../@egovernments/digit-utils/services/Storage";
import { ConvertTimestampToDate } from "../@egovernments/digit-utils/services/date";

const ComplaintDetailsPage = () => {
  const LOCALIZATION_KEY_CS_COMPLAINT = "CS_COMPLAINT_DETAILS";
  const LOCALIZATION_KEY_CS_COMMON = "CS_COMMON";

  let { t } = useTranslation();
  let { id } = useParams();
  const dispatch = useDispatch();

  const [complaintHistory, setComplaintHistory] = useState([]);

  const getComplaint = useCallback(
    (id) => dispatch(searchComplaints({ serviceRequestId: id })),
    [dispatch]
  );

  const getBusinessServiceById = useCallback(
    (id) => dispatch(fetchBusinessServiceById(id)),
    [dispatch]
  );

  useEffect(() => {
    getBusinessServiceById(id);
    getComplaint(id);
  }, [getComplaint, getBusinessServiceById, id]);

  const state = useSelector((state) => state);

  const selectedComplaint = selectComplaints(state);

  const selectedWorkFlow = selectWorkflow(state);
  const historyData = useComplaintHistory(selectedWorkFlow);

  useEffect(() => {
    if (historyData) {
      Promise.all(historyData)
        .then((values) => {
          setComplaintHistory(values);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [historyData]);

  let complaintDetails = {};

  if (selectedComplaint.length > 0) {
    complaintDetails = selectedComplaint[0];
    Storage.set(
      `complaint.${complaintDetails.service.serviceRequestId}`,
      complaintDetails
    );
  }
  let cityCode = () => state.cityCode.toUpperCase().replace(".", "_");

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
    } = complaintDetails.service;

    let { createdTime } = auditDetails;

    let formattedAddress = getFormatedAddress(address);
    return {
      [t(`${LOCALIZATION_KEY_CS_COMMON}_COMPLAINT_NO`)]: serviceRequestId,
      [t(`${LOCALIZATION_KEY_CS_COMMON}_COMPLAINT_STATUS`)]: t(
        `${LOCALIZATION_KEY_CS_COMMON}_${applicationStatus}`
      ),
      [t(
        `${LOCALIZATION_KEY_CS_COMPLAINT}_SUBMISSION_DATE`
      )]: ConvertTimestampToDate(createdTime),
      Address: formattedAddress,
    };
  };

  return (
    <>
      <BackButton>Back</BackButton>
      <Header>{t("CS_HEADER_COMPLAINT_SUMMARY")}</Header>

      {Object.keys(complaintDetails).length > 0 && (
        <>
          <Card>
            <CardSubHeader>
              {t(
                `SERVICEDEFS.${complaintDetails.service.serviceCode.toUpperCase()}`
              )}
            </CardSubHeader>
            <StatusTable dataObject={getTableData()}></StatusTable>
          </Card>
          {
            <>
              <Card>
                <CardSubHeader>
                  {t(`${LOCALIZATION_KEY_CS_COMPLAINT}_COMPLAINT_TIMELINE`)}
                </CardSubHeader>
                {/* <StatusTable dataObject={getTableData()}></StatusTable> */}
                <ConnectingCheckPoints>
                  {complaintHistory.map((history) => {
                    return (
                      <>
                        <CheckPoint
                          key={history.applicationStatus}
                          label={t(
                            `${LOCALIZATION_KEY_CS_COMMON}_${history.applicationStatus}`
                          )}
                          info={history.text}
                          isCompleted={true}
                        />
                      </>
                    );
                  })}
                </ConnectingCheckPoints>
              </Card>
            </>
          }
          <Card>
            <CardSubHeader>
              {t(`${LOCALIZATION_KEY_CS_COMMON}_COMMENTS`)}
            </CardSubHeader>
            <TextArea />
            <SubmitBar label="Send" />
          </Card>
        </>
      )}
    </>
  );
};

export default ComplaintDetailsPage;
