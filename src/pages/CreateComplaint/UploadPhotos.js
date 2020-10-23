import React, { useEffect, useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";
import UploadImages from "../../@egovernments/components/js/UploadImages";
import { Link } from "react-router-dom";
import {
  Filestorage,
  Filefetch,
} from "../../@egovernments/digit-utils/services/Filestorage";

const Pincode = (props) => {
  var thumbnails = [];
  const [image, setImage] = useState(null);
  const [uploadedImagesThumbs, setUploadedImagesThumbs] = useState(null);
  const [uploadedImagesIds, setUploadedImagesIds] = useState(null);
  const [rerender, setRerender] = useState(1);

  function getImage(e) {
    setImage(e.target.files[0]);
  }

  function deleteImage(img) {
    var deleteImageKey;
    uploadedImagesThumbs.flatMap((o, index) => {
      if (o.image === img) {
        deleteImageKey = [o.key, index];
      }
    });
    console.log("deleete image key object", deleteImageKey);
    var index = uploadedImagesIds.findIndex((key) => key == deleteImageKey[0]);
    console.log("index of element to delete", index);
    if (index > -1) {
      var arr = uploadedImagesIds;
      console.log("array before", arr);
      arr.splice(index, 1);
      console.log("array after", arr);
      setUploadedImagesIds(arr);
    }

    var arr2 = uploadedImagesThumbs;
    arr2.splice(deleteImageKey[1], 1);
    setUploadedImagesThumbs(arr2);
    setRerender(rerender + 1);
  }
  async function uploadImage() {
    const response = await Filestorage(image);
    if (uploadedImagesIds === null) {
      var arr = [];
    } else {
      arr = uploadedImagesIds;
    }
    arr = [...arr, response.data.files[0].fileStoreId];
    setUploadedImagesIds(arr);
  }

  async function submit() {
    if (uploadedImagesIds !== null) {
      const res = await Filefetch(
        [uploadedImagesIds[uploadedImagesIds.length - 1]],
        "pb.amritsar"
      );
      var keys = Object.keys(res.data);
      var index = keys.findIndex((key) => key == "fileStoreIds");
      if (index > -1) {
        keys.splice(index, 1);
      }
      if (uploadedImagesThumbs !== null) {
        thumbnails = uploadedImagesThumbs;
      }
      thumbnails.push({ image: res.data[keys[0]].split(",")[2], key: keys[0] });
      setUploadedImagesThumbs(thumbnails);
    }
  }

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  useEffect(() => {
    (async () => {
      if (uploadedImagesIds !== null) {
        await submit();
        setRerender(rerender + 1);
      }
    })();
  }, [uploadedImagesIds]);

  return (
    <Card>
      <CardHeader>Upload Complaint Photos</CardHeader>

      <CardText>
        Click on the icon below to upload the complaint photos as evidence. You
        can capture photos directly through your camera or upload from your
        Gallery. If you do not have complaint photo, you can skip the continue
        for next step.
      </CardText>

      <UploadImages
        onUpload={getImage}
        onDelete={deleteImage}
        thumbnails={
          uploadedImagesThumbs ? uploadedImagesThumbs.map((o) => o.image) : []
        }
      />

      <button onClick={() => console.log(uploadedImagesIds)}>
        show image upload ids
      </button>

      <Link
        to="/create-complaint/details"
        onClick={() => props.save(uploadedImagesIds)}
      >
        <SubmitBar label="Next" />
      </Link>
    </Card>
  );
};

export default Pincode;
