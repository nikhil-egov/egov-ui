import React, { useEffect, useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import UploadImages from "../../@egovernments/components/js/UploadImages";
import { Link, useParams } from "react-router-dom";
import ImageUploaderHandler from "../../components/ImageUploadHandler";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";
import BackButton from "../../@egovernments/components/js/BackButton";

const UploadPhoto = () => {
  let { id } = useParams();
  const [verificationDocuments, setVerificationDocuments] = useState([]);

  const handleUpload = (ids) => {
    setDocState(ids);
  };

  const setDocState = (ids) => {
    const documents = ids.map((id) => ({
      documentType: "PHOTO",
      fileStore: id,
      documentUid: "",
      additionalDetails: {},
    }));
    setVerificationDocuments(documents);
  };

  useEffect(() => {
    let reopenDetails = Storage.get(`reopen.${id}`);
    Storage.set(`reopen.${id}`, { ...reopenDetails, verificationDocuments });
  }, [verificationDocuments]);

  return (
    <>
      <BackButton>Back</BackButton>
      <Card>
        <ImageUploaderHandler
          header="Upload Complaint Photos"
          cardText=""
          onPhotoChange={handleUpload}
        />

        <Link to={`/reopen/addional-details/${id}`}>
          <SubmitBar label="Next" />
        </Link>
      </Card>
    </>
  );
};

export default UploadPhoto;
