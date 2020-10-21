import React, { useEffect } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import TextArea from "../../@egovernments/components/js/TextArea";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComplaint } from "../../redux/actions/index";

const Details = (props) => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);

  useEffect(() => {
    if (
      appState.complaintSubmitResponse &&
      appState.complaintSubmitResponse.responseInfo
    ) {
      props.history.push("/create-complaint/submission");
    }
    console.log("appstate");
    console.log(appState);
  }, [appState.complaintSubmitResponse]);

  async function submitComplaint() {
    await dispatch(createComplaint());
    // props.history.push("/create-complaint/submission")
    // console.log("deatils pusheing siubmisi")
    // console.log(appState)
    // if(appState.complaintSubmitResponse && appState.complaintSubmitResponse.data){
    //     props.history.push("/create-complaint/submission/success?status=yes")
    // }else{
    //     props.history.push("/create-complaint/submission/success?status=no")
    // }
  }
  return (
    <Card>
      <CardHeader>Provide Additional Details</CardHeader>
      <CardText>
        If you think apart from information provided till now additional details
        are required to resolve complaint, provide it below:
      </CardText>
      <TextArea></TextArea>
      <div onClick={submitComplaint}>
        <SubmitBar label="Submit Complaint" />
      </div>
    </Card>
  );
};

export default Details;
