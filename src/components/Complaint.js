import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Card from "../@egovernments/components/js/Card";
import CardCaption from "../@egovernments/components/js/CardCaption";
import { ComplaintStatusToLocalisationKeyMapping } from "../@egovernments/digit-utils/enums/localizationMapping";

const Complaint = (props) => {
  let { data } = props;
  const history = useHistory();
  let { serviceCode, serviceRequestId, applicationStatus } = data;
  const { t } = useTranslation();

  const handleClick = () => {
    history.push(`/complaint-details/${serviceRequestId}`);
  };
  return (
    <Card>
      <div onClick={handleClick}>
        <div>
          <CardCaption>
            {t(`SERVICEDEFS.${serviceCode.toUpperCase()}`)}
          </CardCaption>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <CardCaption>Complaint No.</CardCaption>
          <div>{serviceRequestId}</div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {/* {t("CS_COMMON_" + applicationStatus.toUpperCase())} */}
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
