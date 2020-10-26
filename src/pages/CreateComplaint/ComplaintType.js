import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { MdmsService } from "../../@egovernments/digit-utils/services/MDMS";
import { LocalizationService } from "../../@egovernments/digit-utils/services/Localization";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";

const CreateComplaint = (props) => {
  const appState = useSelector((state) => state);
  var serviceDefs = null;
  var complaintType = null;
  const [menu, setMenu] = useState(null);
  const [menuLocalizationIds, setMenuLocalizationIds] = useState([]);
  const [serviceDefsLocalization, setServiceDefsLocalization] = useState(null);

  function findLocalizedValue(defintions, values) {
    // console.log("defintions")
    // console.log(defintions)
    // console.log("values")
    // console.log(values)
    if (defintions !== null && values !== null) {
      var LocalizedValues = [];
      defintions.map((defintion) => {
        const response = values.findIndex((value) => value === defintion.code);
        if (response > -1) {
          LocalizedValues = [...LocalizedValues, defintion];
        }
      });
      return LocalizedValues;
    }
  }

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
      Storage.set("serviceDefs", serviceDefs);
      var menuIds = [];
      await Promise.all(
        serviceDefs["RAINMAKER-PGR"].ServiceDefs.map((def) => {
          if (
            !menuIds.find(
              (e) => e === "SERVICEDEFS." + def.menuPath.toUpperCase()
            )
          ) {
            if (def.menuPath === "") {
              menuIds.push("SERVICEDEFS.OTHERS");
            } else {
              menuIds.push("SERVICEDEFS." + def.menuPath.toUpperCase());
            }
          }
        })
      );
      // console.log("setMenuLocalizationIds")
      // console.log(menuIds)
      setMenuLocalizationIds(menuIds);
    })();
  }, [appState]);

  useEffect(() => {
    if (menuLocalizationIds.length > 0) {
      (async () => {
        const response = await LocalizationService.getLocale({
          modules: ["rainmaker-pgr"],
          locale: "en_IN",
          tenantId: "pb",
        });
        setServiceDefsLocalization(response);
        // console.log("setServiceDefsLocalization")
        // console.log(response);
        Storage.set("ServiceDefsLocalization", response);
      })();
    }
  }, [menuLocalizationIds]);

  useEffect(() => {
    if (serviceDefsLocalization) {
      const res = findLocalizedValue(
        serviceDefsLocalization,
        menuLocalizationIds
      );
      // console.log("findLocalizedValue");
      // console.log(res);
      setMenu(res);
    }
  }, [serviceDefsLocalization]);

  function selected(type) {
    complaintType = type;
  }

  function save() {
    Storage.set("complaintType", complaintType);
  }

  return (
    <Card>
      <CardHeader>Choose Complaint Type</CardHeader>
      <CardText>
        Select the option related to your complaint from the list given below.
        If the complaint type you are looking for is not listed select others.
      </CardText>
      {menu ? (
        <RadioButtons options={menu} optionsKey="message" selected={selected} />
      ) : null}
      <Link to="/create-complaint/subtype" onClick={save}>
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default CreateComplaint;
