import React from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import CardLabel from "../../@egovernments/components/js/CardLabel";
import Textinput from "../../@egovernments/components/js/Textinput";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";

const MobileNumber = ({ match }) => {
  return (
    <Card>
      <CardHeader>Provide your Name</CardHeader>
      <CardText>
        Provide the name of complainant to make your experience more
        personalised.
      </CardText>
      <CardLabel>Name *</CardLabel>
      <Textinput></Textinput>
      <Link to="/create-complaint">
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default MobileNumber;
