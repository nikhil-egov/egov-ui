import React, { useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import TextArea from "../../@egovernments/components/js/TextArea";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";

const Details = (props) => {
  const [details, setDetails] = useState(null);

  function submitComplaint() {
    props.submitComplaint(details);
  }

  function textInput(e) {
    setDetails(e.target.value);
  }

  return (
    <Card>
      <CardHeader>Provide Additional Details</CardHeader>
      <CardText>
        If you think apart from information provided till now additional details
        are required to resolve complaint, provide it below:
      </CardText>
      <TextArea onChange={textInput}></TextArea>
      <div onClick={submitComplaint}>
        <SubmitBar label="Submit Complaint" />
      </div>
    </Card>
  );
};

export default Details;
