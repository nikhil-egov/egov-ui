import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { MdmsService } from "../../@egovernments/digit-utils/services/MDMS";

const CreateComplaint = (props) => {
  const appState = useSelector((state) => state);
  var serviceDefs = null;
  var complaintType = null;
  const [menuPaths, setMenuPaths] = useState([]);
  useEffect(() => {
    (async () => {
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

      serviceDefs = await MdmsService.getDataByCriteria(criteria);

      var menu = [];
      await Promise.all(
        serviceDefs["RAINMAKER-PGR"].ServiceDefs.map((def) => {
          if (!menu.find((e) => e === def.menuPath)) {
            if (def.menuPath === "") {
              menu.push("Others");
            } else {
              menu.push(def.menuPath);
            }
          }
        })
      );

      setMenuPaths(menu.map((option) => option.split(/(?=[A-Z])/).join(" ")));
    })();
  }, [appState]);

  function selected(type) {
    complaintType = type;
  }

  function save() {
    complaintType = complaintType.split(" ").join("");
    props.save(complaintType);
  }

  return (
    <Card>
      <CardHeader>Choose Complaint Type</CardHeader>
      <CardText>
        Select the option related to your complaint from the list given below.
        If the complaint type you are looking for is not listed select others.
      </CardText>

      <RadioButtons options={menuPaths} selected={selected} />
      <Link to="/create-complaint/subtype" onClick={save}>
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default CreateComplaint;
