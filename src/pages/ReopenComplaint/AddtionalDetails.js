import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import TextArea from "../../@egovernments/components/js/TextArea";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";
import { updateComplaints } from "../../redux/actions/index";

const AddtionalDetails = (props) => {
  const [details, setDetails] = useState(null);

  let { id } = useParams();
  const dispatch = useDispatch();

  const updateComplaint = useCallback(
    (complaintDetails) => dispatch(updateComplaints(complaintDetails)),
    [dispatch]
  );

  const getUpdatedWorkflow = (reopenDetails, complaintDetails, type) => {
    switch (type) {
      case "REOPEN":
        return {
          action: "REOPEN",
          comments: reopenDetails.addtionalDetail,
          assignes: [],
          verificationDocuments: null,
        };
      default:
        return "";
    }
  };

  function submitComplaint() {
    let reopenDetails = Storage.get(`reopen.${id}`);
    let complaintDetails = Storage.get(`complaint.${id}`);

    complaintDetails.workflow = getUpdatedWorkflow(
      reopenDetails,
      complaintDetails,
      "REOPEN"
    );

    complaintDetails.service.additionalDetail = {
      REOPEN_REASON: reopenDetails.reason,
    };

    updateComplaint(complaintDetails);
    console.log("complaintDetails:", complaintDetails);
  }

  function textInput(e) {
    setDetails(e.target.value);
    let reopenDetails = Storage.get(`reopen.${id}`);
    console.log("reopenDetails:", reopenDetails);
    Storage.set(`reopen.${id}`, {
      ...reopenDetails,
      addtionalDetail: e.target.value,
    });
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
        <SubmitBar label="Reopen Complaint" />
      </div>
    </Card>
  );
};

export default AddtionalDetails;
