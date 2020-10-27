import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../@egovernments/components/js/BackButton";
import ComplaintType from "./ComplaintType";
import UserOnboarding from "../UserOnboarding/index";
import SubType from "./SubType";
import LocationSearch from "./LocationSearch";
import Pincode from "./Pincode";
import Address from "./Address";
import Landmark from "./Landmark";
import UploadPhotos from "./UploadPhotos";
import Details from "./Details";
import Submission from "./Submission";
import { createComplaint } from "../../redux/actions/index";

const CreateComplaint = ({ match, history }) => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  const [pincode, setPincode] = useState(null);
  const [city, setCity] = useState(null);
  const [locality, setLocality] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [details, setDetails] = useState(null);
  const [complaintType, setComplaintType] = useState(null);
  const [uploadedImageIds, setUploadedImageIds] = useState([]);

  const citAuth = "37fc8b3a-ef66-4c05-aa87-5182e19b5dec";
  var localityCode = "";
  const complaintParams = {
    RequestInfo: {
      apiId: "Rainmaker",
      action: "",
      did: 1,
      key: "",
      msgId: "20170310130900|en_IN",
      requesterId: "",
      ts: Date.now(),
      ver: ".01",
      userInfo: {
        id: 23349,
        uuid: "530968f3-76b3-4fd1-b09d-9e22eb1f85df",
        userName: "9404052047",
        name: "Aniket T",
        mobileNumber: "9404052047",
        emailId: "xc@gmail.com",
        locale: null,
        type: "CITIZEN",
        roles: [
          {
            name: "Citizen",
            code: "CITIZEN",
            tenantId: "pb",
          },
        ],
        active: true,
        tenantId: "pb",
      },
      authToken: citAuth,
    },
    service: {
      tenantId: appState.cityCode,
      serviceCode: complaintType,
      description: details,
      accountId: "7b2561e8-901b-40a2-98b7-7e627fc5b1d6",
      additionalDetail: {},
      applicationStatus: null,
      source: "whatsapp",
      rating: 4,
      address: {
        doorNo: "2",
        plotNo: "10",
        landmark: "Near City Hall",
        city: city,
        district: city,
        region: city,
        state: appState.stateInfo.name,
        country: "India",
        pincode: pincode,
        buildingName: "Safalya",
        street: "10th main",
        locality: {
          code: locality !== null ? locality.code : "",
          name: locality !== null ? locality.name : "",
        },
        geoLocation: {
          // latitude: 21,
          // longitude: 56,
          // additionalDetails: {},
        },
      },
    },
    workflow: {
      action: "APPLY",
      assignes: [],
      comments: "Stright light is not working",
      verificationDocuments: [
        // {
        //   documentType: "PHOTO",
        //   fileStore: "",
        //   documentUid: "",
        //   additionalDetails: {},
        // },
      ],
    },
  };

  const [createComplaintParams, setComplaintParams] = useState(complaintParams);

  useEffect(() => {
    if (
      appState.complaintSubmitResponse &&
      appState.complaintSubmitResponse.responseInfo
    ) {
      history.push("/create-complaint/submission");
    }
  }, [appState.complaintSubmitResponse]);

  const savePincode = (val) => {
    setPincode(val);
  };

  const saveAddress = (city, locality) => {
    setCity(city);
    setLocality(locality);
  };

  const saveLandmark = (landmark) => {
    setLandmark(landmark);
  };

  const submitComplaint = async (details) => {
    setDetails(details);
    console.log(complaintParams);
    await dispatch(createComplaint(complaintParams));
  };

  const saveComplaintType = (type) => {
    setComplaintType(type);
  };

  const saveImagesUrl = (imageUrls) => {
    imageUrls === null
      ? setUploadedImageIds([])
      : setUploadedImageIds(imageUrls);
  };

  return (
    <React.Fragment>
      <BackButton />
      <Route
        path={match.url + "/onboarding"}
        component={(props) => <UserOnboarding />}
      />
      <Route
        exact
        path={match.url + "/"}
        component={(props) => <ComplaintType />}
      />
      <Route
        path={match.url + "/subtype"}
        component={(props) => <SubType save={saveComplaintType} />}
      />
      <Route
        path={match.url + "/location"}
        component={(props) => <LocationSearch />}
      />
      <Route
        path={match.url + "/pincode"}
        component={(props) => <Pincode save={(val) => savePincode(val)} />}
      />
      <Route
        path={match.url + "/address"}
        component={(props) => <Address save={saveAddress} />}
      />
      <Route
        path={match.url + "/landmark"}
        component={(props) => <Landmark save={saveLandmark} />}
      />
      <Route
        path={match.url + "/upload-photos"}
        component={(props) => <UploadPhotos save={saveImagesUrl} />}
      />
      <Route
        path={match.url + "/details"}
        component={(props) => <Details submitComplaint={submitComplaint} />}
      />
      <Route
        path={match.url + "/submission"}
        component={(props) => <Submission />}
      />
      <p
        onClick={() => {
          console.log(createComplaintParams);
          console.log(pincode);
          console.log(city);
          console.log(locality);
          console.log(landmark);
          console.log(details);
          console.log(complaintType);
          console.log(uploadedImageIds);
        }}
      >
        show state
      </p>
    </React.Fragment>
  );
};

export default CreateComplaint;
