import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BackButton from "../../@egovernments/components/js/BackButton";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import TextArea from "../../@egovernments/components/js/TextArea";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";
import { updateComplaints } from "../../redux/actions/index";

const AddtionalDetails = ({ history }) => {
  // const [details, setDetails] = useState(null);

  let { id } = useParams();
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);

  useEffect(() => {
    const { response } = appState.complaints;
    if (response && response.responseInfo.status === "successful") {
      history.push("/response");
    }
  }, [appState.complaints, history]);

  const updateComplaint = useCallback(
    (complaintDetails) => dispatch(updateComplaints(complaintDetails)),
    [dispatch]
  );

  const getUpdatedWorkflow = (reopenDetails, type) => {
    switch (type) {
      case "REOPEN":
        return {
          action: "REOPEN",
          comments: reopenDetails.addtionalDetail,
          assignes: [],
          verificationDocuments: reopenDetails.verificationDocuments,
        };
      default:
        return "";
    }
  };

  function reopenComplaint() {
    let reopenDetails = Storage.get(`reopen.${id}`);
    let complaintDetails = Storage.get(`complaint.${id}`);

    complaintDetails.workflow = getUpdatedWorkflow(
      reopenDetails,
      // complaintDetails,
      "REOPEN"
    );
    complaintDetails.service.additionalDetail = {
      REOPEN_REASON: reopenDetails.reason,
    };
    updateComplaint(complaintDetails);

    // return (
    //   <Redirect
    //     to={{
    //       pathname: "/response",
    //       state: { complaintDetails },
    //     }}
    //   />
    // );
  }

  function textInput(e) {
    // setDetails(e.target.value);
    let reopenDetails = Storage.get(`reopen.${id}`);
    Storage.set(`reopen.${id}`, {
      ...reopenDetails,
      addtionalDetail: e.target.value,
    });
  }

  return (
    <>
      <BackButton onClick={() => history.goBack()}>Back</BackButton>
      <Card>
        <CardHeader>Provide Additional Details</CardHeader>
        <CardText>
          If you think apart from information provided till now additional
          details are required to resolve complaint, provide it below:
        </CardText>
        <TextArea onChange={textInput}></TextArea>
        <div onClick={reopenComplaint}>
          <SubmitBar label="Reopen Complaint" />
        </div>
      </Card>
    </>
  );
};

export default AddtionalDetails;
