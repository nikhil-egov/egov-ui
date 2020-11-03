import React, { useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardSubHeader from "../../@egovernments/components/js/CardSubHeader";
import CardText from "../../@egovernments/components/js/CardText";
import CardLabel from "../../@egovernments/components/js/CardLabel";
import Textinput from "../../@egovernments/components/js/Textinput";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import LinkLabel from "../../@egovernments/components/js/LinkLabel";
import { Link } from "react-router-dom";

const Pincode = (props) => {
  const [pincode, setPincode] = useState(null);

  function textInput(e) {
    setPincode(e.target.value);
  }
  return (
    <Card>
      <CardSubHeader>Complaint's Location</CardSubHeader>
      <CardHeader>Do you know the pincode?</CardHeader>
      <CardText>
        If you know the pincode of the complaint address, provide below. It will
        help us identify complaint location easily or you can skip and continue
      </CardText>
      <CardLabel>Pincode</CardLabel>
      <Textinput onChange={textInput} />
      <Link
        to="/create-complaint/address"
        onClick={() => {
          props.save(pincode);
        }}
      >
        <SubmitBar label="Next" />
      </Link>
      {props.skip ? (
        <Link to="/create-complaint/address">
          <LinkLabel>Skip and Continue</LinkLabel>
        </Link>
      ) : null}
    </Card>
  );
};

export default Pincode;
