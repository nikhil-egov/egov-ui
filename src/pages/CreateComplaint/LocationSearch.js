import React from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import LocationSearch from "../../@egovernments/components/js/LocationSearch";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import LinkLabel from "../../@egovernments/components/js/LinkLabel";
import { Link } from "react-router-dom";

const CreateComplaint = (props) => {
  return (
    <Card>
      <CardHeader>Pin Complaint Location</CardHeader>
      <CardText>
        Click and hold to drop the pin to complaint location. If you are not
        able to pin the location you can skip the continue for next step.
      </CardText>

      <LocationSearch />

      <Link to="/create-complaint/pincode">
        <SubmitBar label="Next" />
        {props.skip ? (
          <LinkLabel style={{ textAlign: "center" }}>
            Skip and Continue
          </LinkLabel>
        ) : null}
      </Link>
    </Card>
  );
};

export default CreateComplaint;
