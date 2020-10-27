import React from "react";
import { Route } from "react-router-dom";
import MobileNumber from "./MobileNumber";
import OTP from "./OTP";
import Name from "./Name";

const UserOnboarding = ({ match }) => {
  return (
    <React.Fragment>
      <Route path={match.url + "/mobile-number"} component={MobileNumber} />
      <Route path={match.url + "/otp"} component={OTP} />
      <Route path={match.url + "/name"} component={Name} />
    </React.Fragment>
  );
};

export default UserOnboarding;
