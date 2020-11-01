import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { MdmsService } from "../../@egovernments/digit-utils/services/MDMS";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";
import { useTranslation } from "react-i18next";

const CreateComplaint = (props) => {
  const appState = useSelector((state) => state);
  const { t } = useTranslation();
  const [localMenu, setLocalMenu] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    (async () => {
      const criteria = {
        type: "serviceDefinitions",
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

      const serviceDefs = await MdmsService.getDataByCriteria(criteria);
      Storage.set("serviceDefs", serviceDefs);
      console.log("serviceDefs");
      console.log(serviceDefs);
      var catalyst = [];
      await Promise.all(
        serviceDefs.map((def) => {
          if (!catalyst.find((e) => e.key === def.menuPath)) {
            if (def.menuPath === "") {
              catalyst.push({
                name: t("SERVICEDEFS.OTHERS"),
                key: def.menuPath,
              });
            } else {
              catalyst.push({
                name: t("SERVICEDEFS." + def.menuPath.toUpperCase()),
                key: def.menuPath,
              });
            }
          }
          return 0;
        })
      );
      setLocalMenu(catalyst);
    })();
  }, [appState, t]);

  function selected(type) {
    console.log(type);
    setSelectedOption(type);
    Storage.set("complaintType", type);
  }

  return (
    <Card>
      <CardHeader>Choose Complaint Type</CardHeader>
      <CardText>
        Select the option related to your complaint from the list given below.
        If the complaint type you are looking for is not listed select others.
      </CardText>
      {localMenu ? (
        <RadioButtons
          selectedOption={selectedOption}
          options={localMenu}
          optionsKey="name"
          onSelect={selected}
        />
      ) : null}
      <Link to="/create-complaint/subtype">
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default CreateComplaint;
