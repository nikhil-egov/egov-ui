import React, { useEffect, useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardCaption from "../../@egovernments/components/js/CardCaption";
import CardText from "../../@egovernments/components/js/CardText";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";
import { LocalizationService } from "../../@egovernments/digit-utils/services/Localization";
import { useSelector } from "react-redux";

const SubType = (props) => {
  const appState = useSelector((state) => state);
  const [serviceDefs, setServiceDefs] = useState(null);
  var serviceDefLocalization = null;
  useEffect(() => {
    (async () => {
      serviceDefLocalization = await LocalizationService.getLocale({
        modules: ["rainmaker-pgr"],
        locale: "en_IN",
        tenantId: "pb",
      });
      console.log("SERVICEDEFS." + props.complaintType.toUpperCase());
      // serviceDefLocalization.
      setServiceDefs(serviceDefLocalization);
      console.log(serviceDefLocalization);
      console.log(props.serviceDefs);
    })();
  }, [appState]);

  return (
    <Card>
      <CardCaption>Garbage</CardCaption>
      <CardHeader>Choose Complaint Sub-Type</CardHeader>
      <CardText>
        The complaint type you have chosen has following complaint sub-types.
        Select the option of your choice from the list given below.
      </CardText>

      <RadioButtons
        options={[
          "Garbage needs to be cleared",
          "Damaged Garbage Bin",
          "Burning of Garbage",
        ]}
      />
      <Link to="/create-complaint/location">
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default SubType;
