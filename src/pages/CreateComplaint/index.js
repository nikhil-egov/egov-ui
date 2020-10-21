import React, { useState } from "react";
import { Route } from "react-router-dom";
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

const CreateComplaint = ({ match }) => {
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
      authToken: "{{citAuth}}",
    },
    service: {
      tenantId: "pb.amritsar",
      serviceCode: "StreetLightNotWorking",
      description: "StreetLight is not working",
      accountId: "7b2561e8-901b-40a2-98b7-7e627fc5b1d6",
      additionalDetail: {},
      applicationStatus: null,
      source: "whatsapp",
      rating: 4,
      address: {
        doorNo: "2",
        plotNo: "10",
        landmark: "Near City Hall",
        city: "Amritsar",
        district: "Amritsar",
        region: "Amritsar",
        state: "Punjab",
        country: "India",
        pincode: "111111",
        buildingName: "Safalya",
        street: "10th main",
        locality: {
          code: "SUN01",
          name: "Ajit Nagar",
        },
        geoLocation: {
          latitude: 21,
          longitude: 56,
          additionalDetails: {},
        },
      },
    },
    workflow: {
      action: "APPLY",
      assignes: [],
      comments: "Stright light is not working",
      verificationDocuments: [
        {
          documentType: "PHOTO",
          fileStore: "b0c5a846-c75a-11ea-87d0-0242ac130003",
          documentUid: "",
          additionalDetails: {},
        },
      ],
    },
  };

  const [createComplaintParams, setComplaintParams] = useState(complaintParams);
  const [pincode, setPincode] = useState(null);
  const [city, setCity] = useState(null);
  const [locality, setLocality] = useState(null);

  const savePincode = (val) => {
    setPincode(val);
  };

  const saveAddress = (city, locality) => {
    setCity(city);
    setLocality(locality);
  };

  return (
    <React.Fragment>
      <BackButton />
      <Route path={match.url + "/onboarding"} component={UserOnboarding} />
      <Route
        exact
        path={match.url + "/"}
        component={(props) => <ComplaintType />}
      />
      <Route path={match.url + "/subtype"} component={SubType} />
      <Route path={match.url + "/location"} component={LocationSearch} />
      <Route
        path={match.url + "/pincode"}
        component={(props) => <Pincode save={(val) => savePincode(val)} />}
      />
      <Route
        path={match.url + "/address"}
        component={(props) => <Address save={saveAddress} />}
      />
      <Route path={match.url + "/landmark"} component={Landmark} />
      <Route path={match.url + "/upload-photos"} component={UploadPhotos} />
      <Route path={match.url + "/details"} component={Details} />
      <Route path={match.url + "/submission"} component={Submission} />
    </React.Fragment>
  );
};

export default CreateComplaint;
