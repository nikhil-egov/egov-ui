import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { MdmsService } from "../../@egovernments/digit-utils/services/MDMS";

const CreateComplaint = (Props) => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  console.log(appState);
  async function callServ() {
    const criteria = {
      details: {
        tenantId: appState.stateInfo.code,
        moduleDetails: [
          {
            moduleName: "RAINMAKER-PGR",
            masterDetails: [
              {
                name: "ServiceDefs",
              },
            ],
          },
        ],
      },
    };
    console.log(await MdmsService.getDataByCriteria(criteria));
  }
  return (
    <Card>
      <CardHeader>Choose Complaint Type</CardHeader>
      <CardText>
        Select the option related to your complaint from the list given below.
        If the complaint type you are looking for is not listed select others.{" "}
      </CardText>

      <RadioButtons
        options={[
          "Streetlights",
          "Garbage",
          "Drains",
          "Water & Sewage",
          "Roads & Footpath",
        ]}
      />
      <Link to="/create-complaint/subtype">
        <SubmitBar label="Next" />
      </Link>

      <button onClick={callServ}>Service DEfs</button>
    </Card>
  );
};

export default CreateComplaint;
