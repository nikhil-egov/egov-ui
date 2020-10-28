import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Card from "../@egovernments/components/js/Card";
import CardCaption from "../@egovernments/components/js/CardCaption";
import { ComplaintStatusToLocalisationKeyMapping } from "../@egovernments/digit-utils/enums/localizationMapping";
import { ConvertTimestampToDate } from "../@egovernments/digit-utils/services/date";

const Complaint = (props) => {
  let { data } = props;
  let { serviceCode, serviceRequestId, applicationStatus } = data;

  const history = useHistory();
  const { t } = useTranslation();

  const handleClick = () => {
    history.push(`/complaint/details/${serviceRequestId}`);
  };
  return (
    <Card>
      <div onClick={handleClick}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "self-end",
          }}
        >
          <div>
            <div>
              <CardCaption>
                {t(`SERVICEDEFS.${serviceCode.toUpperCase()}`)}
              </CardCaption>
            </div>
            <div>
              <>{ConvertTimestampToDate(data.auditDetails.createdTime)} </>
            </div>
          </div>
          <div
            style={{
              borderRadius: "15px",
              color: "#D4351C",
              backgroundColor: "#f8e0dc",
              padding: "0.1rem 1.2rem",
              fontSize: "1.2rem",
              display: "inline-block",
            }}
          >
            Open
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <div>Complaint No.</div>
          <CardCaption>{serviceRequestId}</CardCaption>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {/* {t("CS_COMMON_" + applicationStatus.toUpperCase())} */}
          {/* {console.log(
            serviceRequestId,
            "applicationStatus.toLowerCase():",
            applicationStatus.toLowerCase()
          )} */}
          {t(
            ComplaintStatusToLocalisationKeyMapping[
              applicationStatus.toLowerCase()
            ]
          )}
        </div>
      </div>
    </Card>
  );
};

export default Complaint;
