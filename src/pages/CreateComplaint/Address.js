import React, { useEffect, useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardSubHeader from "../../@egovernments/components/js/CardSubHeader";
import CardText from "../../@egovernments/components/js/CardText";
import CardLabel from "../../@egovernments/components/js/CardLabel";
import Dropdown from "../../@egovernments/components/js/Dropdown";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
// import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocalities } from "../../redux/actions";
import { useTranslation } from "react-i18next";

const Address = (props) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const cities = [];
  var localities = [];

  useEffect(() => {
    appState.cities.map((city) => cities.push(city.name));
    if (appState.localities.localityList) {
      appState.localities.localityList.map((locality) =>
        localities.push(locality.name)
      );
    }
    if (appState.localities.city) {
      setSelectedCity(appState.localities.city);
    }
  }, [localities, cities]);

  async function selectCity(city) {
    await dispatch(fetchLocalities(city));
  }
  function selectLocalities(locality) {
    let localityDetails = appState.localities.localityList.find(
      (o) => o.name === locality
    );
    setSelectedLocality(localityDetails);
  }

  function save() {
    props.save(selectedCity, selectedLocality);
  }
  return (
    <Card>
      <CardSubHeader>{t("CS_ADDCOMPLAINT_COMPLAINT_LOCATION")}</CardSubHeader>
      <CardHeader>{t("CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS")}</CardHeader>
      <CardText>
        {/* Choose the locality/mohalla of the complaint from the list given below. */}
        {t("CS_CHOOSE_CITY_MOHALLA_TEXT")}
      </CardText>
      <CardLabel>{t("MYCITY_CODE_LABEL")} *</CardLabel>
      <Dropdown
        isMandatory
        option={cities}
        select={selectCity}
        set={appState.localities.city}
      />
      <CardLabel>{t("CS_CREATECOMPLAINT_MOHALLA")} *</CardLabel>
      {/* <RadioButtons options={["Ajit Nagar", "Patel Nagar"]}/> */}
      <Dropdown isMandatory option={localities} select={selectLocalities} />
      <Link to="/create-complaint/landmark" onClick={save}>
        <SubmitBar label={t("PT_COMMONS_NEXT")} />
      </Link>
    </Card>
  );
};

export default Address;
