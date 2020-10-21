import React, { useEffect } from "react";
import Card from "../../@egovernments/components/js/Card";
import Banner from "../../@egovernments/components/js/Banner";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Submission = (props) => {
  const appState = useSelector((state) => state);
  return (
    <Card>
      {appState.complaintSubmitResponse && (
        <Banner
          message="Complaint Submitted"
          complaintNumber="02/09/2020/0517505"
          successful={
            appState.complaintSubmitResponse.responseInfo &&
            appState.complaintSubmitResponse.responseInfo.status ===
              "successful"
              ? true
              : false
          }
        />
      )}
      <CardText>
        The notification along with complaint number is sent to your registered
        mobile number. You can track the complaint status using mobile or web
        app.
      </CardText>
      <Link to="/create-complaint">
        <SubmitBar label="Go back to home page" />
      </Link>
    </Card>
  );
};

export default Submission;
