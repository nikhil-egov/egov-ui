import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Complaint from "../components/Complaint";

import { searchComplaints } from "../redux/actions";
import BackButton from "../@egovernments/components/js/BackButton";
import Header from "../@egovernments/components/js/Header";

const ComplaintsPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const complaints = state.complaints.list;
  const getComplaints = useCallback(() => dispatch(searchComplaints()), [
    dispatch,
  ]);

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

  return (
    <>
      <BackButton>Back</BackButton>
      <Header>My Complaints</Header>

      {complaints &&
        complaints.length > 0 &&
        complaints.map(({ service }, index) => (
          <div key={index}>
            <Complaint data={service} />
          </div>
        ))}
    </>
  );
};

export default ComplaintsPage;
