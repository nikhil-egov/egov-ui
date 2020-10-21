import React, { useCallback, useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardSubHeader from "../../@egovernments/components/js/CardSubHeader";
import CardText from "../../@egovernments/components/js/CardText";
import CardLabel from "../../@egovernments/components/js/CardLabel";
import Dropdown from "../../@egovernments/components/js/Dropdown";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocalities } from "../../redux/actions";

const Address = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const appState = useSelector((state) => state);
  const cities = [];
  var localities = [];
  appState.cities.map((city) => {
    cities.push(city.name);
  });
  if (appState.localities.localityList) {
    appState.localities.localityList.map((locality) => {
      localities.push(locality.name);
    });
  }
  const dispatch = useDispatch();
  const getLocalities = useCallback((city) => dispatch(fetchLocalities(city)), [
    dispatch,
  ]);
  function selectCity(city) {
    // let city = appState.cities.find(o => o.name === select);
    getLocalities(city);
    setSelectedCity(city);
  }
  function selectLocalities(locality) {
    setSelectedLocality(locality);
  }
  return (
    <Card>
      <CardSubHeader>Complaint's Location</CardSubHeader>
      <CardHeader>Provide Complaint Address</CardHeader>
      <CardText>
        Choose the locality/mohalla of the complaint from the list given below.
      </CardText>
      <CardLabel>City *</CardLabel>
      <Dropdown isMandatory={true} option={cities} select={selectCity} />
      <CardLabel>Moholla *</CardLabel>
      {/* <RadioButtons options={["Ajit Nagar", "Patel Nagar"]}/> */}
      <Dropdown isMandatory option={localities} select={selectLocalities} />
      <Link to="/create-complaint/landmark">
        <SubmitBar label="Next" />
      </Link>
      <p onClick={() => console.log(appState)}>appsate</p>
    </Card>
  );
};

export default Address;
