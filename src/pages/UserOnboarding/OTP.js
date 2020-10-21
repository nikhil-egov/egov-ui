import React from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import OTPInput from "../../@egovernments/components/js/OTPInput";
import CardTextButton from "../../@egovernments/components/js/CardTextButton";
import { Link } from "react-router-dom";

const MobileNumber = () => {
  return (
    <Card>
      <CardHeader>OTP Verification</CardHeader>
      <CardText>
        Enter the OTP sent to <span>+91 - 9876453444</span>
      </CardText>
      <OTPInput length={4} />
      <CardTextButton>Resend OTP</CardTextButton>
      <Link to="/create-complaint/onboarding/name">
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default MobileNumber;
