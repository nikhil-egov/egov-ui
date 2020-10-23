import React from "react";
import Card from "../../@egovernments/components/js/Card";
import Banner from "../../@egovernments/components/js/Banner";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BannerPicker = ({ appState }) => {
  if (
    appState.complaintSubmitResponse &&
    appState.complaintSubmitResponse.responseInfo
  ) {
    return (
      <Banner
        message="Complaint Submitted"
        complaintNumber={
          appState.complaintSubmitResponse.ServiceWrappers[0].service
            .serviceRequestId
        }
        successful={true}
      />
    );
  } else {
    return <Banner message="Complaint Not Submitted" successful={false} />;
  }
};

const Submission = (props) => {
  const appState = useSelector((state) => state);
  return (
    <Card>
      <BannerPicker appState={appState} />
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
