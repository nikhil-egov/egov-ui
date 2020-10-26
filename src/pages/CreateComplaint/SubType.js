import React, { useEffect, useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardCaption from "../../@egovernments/components/js/CardCaption";
import CardText from "../../@egovernments/components/js/CardText";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";

const SubType = (props) => {
  const appState = useSelector((state) => state);
  const [subMenu, setSubMenu] = useState([]);
  const [selected, setSelected] = useState(null);

  function getServiceCode(value, definitions) {}

  useEffect(() => {
    const subTypeKey = Storage.get("complaintType").code.split(".")[1];
    const subMenuIds = Storage.get("serviceDefs")[
      "RAINMAKER-PGR"
    ].ServiceDefs.filter((def) =>
      def.menuPath === "" ? "OTHERS" : def.menuPath.toUpperCase() === subTypeKey
    );
    const ServiceDefsLocalization = Storage.get("ServiceDefsLocalization");
    let subMenu = [];
    let subMenu2 = [];
    subMenuIds.map((id) => {
      subMenu = [
        ...subMenu,
        ServiceDefsLocalization.find(
          (def) => def.code === "SERVICEDEFS." + id.serviceCode.toUpperCase()
        ),
      ];
    });

    ServiceDefsLocalization.map((def) => {
      const searchResponse = subMenuIds.find(
        (id) => "SERVICEDEFS." + id.serviceCode.toUpperCase() === def.code
      );
      if (searchResponse) {
        subMenu2 = [...subMenu2, searchResponse];
      }
    });
    console.log(subMenu2);

    setSubMenu(subMenu);
  }, [appState]);

  function onSelect(item) {
    console.log(item);
    setSelected(item);
  }

  function onSave() {
    props.save(selected);
  }

  return (
    <Card>
      <CardCaption>Garbage</CardCaption>
      <CardHeader>Choose Complaint Sub-Type</CardHeader>
      <CardText>
        The complaint type you have chosen has following complaint sub-types.
        Select the option of your choice from the list given below.
      </CardText>

      <RadioButtons
        options={subMenu}
        optionsKey="message"
        selected={onSelect}
      />
      <Link to="/create-complaint/location" onClick={onSave}>
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default SubType;
