import React, { useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardSubHeader from "../../@egovernments/components/js/CardSubHeader";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import CardLabel from "../../@egovernments/components/js/CardLabel";
import TextArea from "../../@egovernments/components/js/TextArea";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";

const Landmark = (props) => {
  const [landmark, setLandmark] = useState(null);

  function textInput(e) {
    setLandmark(e.target.value);
  }

  function save() {
    props.save(landmark);
  }

  return (
    <Card>
      <CardSubHeader>Complaint's Location</CardSubHeader>
      <CardHeader>Provide Landmark</CardHeader>
      <CardText>
        Provide the landmark to help us reach the complaint location easily.
      </CardText>
      <CardLabel>Landmark</CardLabel>
      <TextArea onChange={textInput}></TextArea>
      <Link to="/create-complaint/upload-photos" onClick={save}>
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default Landmark;
