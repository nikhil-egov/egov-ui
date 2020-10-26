import React from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import UploadImages from "../../@egovernments/components/js/UploadImages";
import { Link, useParams } from "react-router-dom";

const UploadPhoto = () => {
  let { id } = useParams();
  return (
    <Card>
      <CardHeader>Upload Complaint Photos</CardHeader>
      <CardText>
        Click on the icon below to upload the complaint photos as evidence. You
        can capture photos directly through your camera or upload from your
        Gallery. If you do not have complaint photo, you can skip the continue
        for next step.
      </CardText>
      <UploadImages />
      <Link to={`/complaint-reopen-addional-details/${id}`}>
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default UploadPhoto;
