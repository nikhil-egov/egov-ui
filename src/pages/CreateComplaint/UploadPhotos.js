import React, { useEffect, useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import UploadImages from "../../@egovernments/components/js/UploadImages";
import { Link } from "react-router-dom";
import Axios from "axios";
import {
  Filestorage,
  Filefetch,
} from "../../@egovernments/digit-utils/services/Filestorage";

const Pincode = (props) => {
  const [image, setImage] = useState(null);
  const [uploadedImagesThumbs, setUploadedImagesThumbs] = useState(null);
  var thumbnails = [];
  const [uploadedImages, setUploadedImages] = useState(null);
  function upload() {
    console.log("upload");
  }
  function getImage(e) {
    setImage(e.target.files[0]);
  }
  async function imageDisp() {
    console.log(image);
    // const formData = new FormData();

    // formData.append("file", image, image.name);
    // formData.append("tenantId", "pb.amritsar");
    // formData.append("module", "property-upload");
    // var config = {
    //   method: "post",
    //   url: "/filestore/v1/files",
    //   data: formData,
    // };

    // const response = await Axios(config);
    const response = await Filestorage(image);
    console.log(response.data);
    if (uploadedImages === null) {
      var arr = [];
    } else {
      arr = uploadedImages;
    }
    arr.push(response.data.files[0].fileStoreId);
    setUploadedImages(arr);
    console.log(uploadedImages);
  }

  async function submit() {
    console.log(uploadedImages);
    if (uploadedImages.length !== 0) {
      // var config = {
      //   method: "get",
      //   url: "/filestore/v1/files/url",
      //   params: {
      //     tenantId: "pb.amritsar",
      //     fileStoreIds: uploadedImages.join(","),
      //   },
      // };

      // const res = await Axios(config);

      const res = await Filefetch(uploadedImages, "pb.amritsar");
      console.log(res.data);
      await Promise.all(
        Object.keys(res.data).map((pos) => {
          if (pos !== "fileStoreIds") {
            thumbnails.push(res.data[pos].split(",")[2]);
          }
        })
      );
      setUploadedImagesThumbs(thumbnails);
    }
  }

  // useEffect(()=>{
  //   if(thumbnails.length>0){
  //     console.log(thumbnails)

  //   }
  // },[thumbnails])
  return (
    <Card>
      <CardHeader>Upload Complaint Photos</CardHeader>
      <CardText>
        Click on the icon below to upload the complaint photos as evidence. You
        can capture photos directly through your camera or upload from your
        Gallery. If you do not have complaint photo, you can skip the continue
        for next step.
      </CardText>
      <UploadImages onUpload={getImage} thumbnails={uploadedImagesThumbs} />
      {/* {uploadedImagesThumbs && <UploadImages thumbnails={uploadedImagesThumbs}/>}       */}
      <button onClick={imageDisp}>upload</button>
      <button onClick={() => console.log(uploadedImages)}>Show upload</button>
      <button onClick={() => console.log(thumbnails)}>Show thumbs</button>
      <br></br>
      <button onClick={submit}>submit images</button>
      <Link to="/create-complaint/details">
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default Pincode;
