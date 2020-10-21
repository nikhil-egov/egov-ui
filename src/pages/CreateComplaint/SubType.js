import React from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardCaption from "../../@egovernments/components/js/CardCaption";
import CardText from "../../@egovernments/components/js/CardText";
import RadioButtons from "../../@egovernments/components/js/RadioButtons";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";

const CreateComplaint = () => {
  return (
    <Card>
      <CardCaption>Garbage</CardCaption>
      <CardHeader>Choose Complaint Sub-Type</CardHeader>
      <CardText>
        The complaint type you have chosen has following complaint sub-types.
        Select the option of your choice from the list given below.
      </CardText>

      <RadioButtons
        options={[
          "Garbage needs to be cleared",
          "Damaged Garbage Bin",
          "Burning of Garbage",
        ]}
      />
      <Link to="/create-complaint/location">
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default CreateComplaint;
