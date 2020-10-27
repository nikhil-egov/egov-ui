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

const Address = (props) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();

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
      <CardSubHeader>Complaint's Location</CardSubHeader>
      <CardHeader>Provide Complaint Address</CardHeader>
      <CardText>
        Choose the locality/mohalla of the complaint from the list given below.
      </CardText>
      <CardLabel>City *</CardLabel>
      <Dropdown
        isMandatory
        option={cities}
        select={selectCity}
        set={appState.localities.city}
      />
      <CardLabel>Moholla *</CardLabel>
      {/* <RadioButtons options={["Ajit Nagar", "Patel Nagar"]}/> */}
      <Dropdown isMandatory option={localities} select={selectLocalities} />
      <Link to="/create-complaint/landmark" onClick={save}>
        <SubmitBar label="Next" />
      </Link>
      <p onClick={() => console.log(appState)}>appsate</p>
    </Card>
  );
};

export default Address;
