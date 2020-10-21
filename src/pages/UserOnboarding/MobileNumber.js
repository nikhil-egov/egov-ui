import React from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import CardLabel from "../../@egovernments/components/js/CardLabel";
import Textinput from "../../@egovernments/components/js/Textinput";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";

const MobileNumber = () => {
  return (
    <Card>
      <CardHeader>Provide your Mobile No.</CardHeader>
      <CardText>
        Provide mobile number and validate with OTP sent to you through SMS.
        This will help us contact you in case if we need more information about
        complaint.
      </CardText>
      <CardLabel>Mobile No. *</CardLabel>
      <Textinput></Textinput>

      <Link to="/create-complaint/onboarding/otp">
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default MobileNumber;
