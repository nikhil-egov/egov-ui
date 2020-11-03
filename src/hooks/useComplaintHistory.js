import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useComplaintHistory = (processInstance) => {
  const [complaintHistory, setComplaintHistory] = useState([]);

  const getNextState = (obj) => {
    const key = obj.state.applicationStatus;
    switch (key) {
      case "PENDINGATLME":
        let assignes = obj.assignes != null && obj.assignes[0];
        let { name, mobileNumber } = assignes;
        return (
          name &&
          mobileNumber && (
            <>
              <span>
                assigned to {name} {mobileNumber}
              </span>
            </>
          )
        );
      case "RESOLVED":
        return (
          <>
            <Link to={`/reopen/reason/${obj.businessId}`}>
              <span style={{ color: "#F47738" }}>RE-OPEN</span>
            </Link>
            <Link to={`/rating/${obj.businessId}`}>
              &nbsp; <span style={{ color: "#F47738" }}>RATE</span>
            </Link>
          </>
        );
      default:
      // code block
    }
  };

  const getHistory = useCallback((processInstance) => {
    if (Object.keys(processInstance).length > 0) {
      let { ProcessInstances } = processInstance;
      let history = ProcessInstances.map((instance) => {
        return {
          applicationStatus: instance.state.applicationStatus,
          text: getNextState(instance),
        };
      });
      return history;
    }
  }, []);

  useEffect(() => {
    const history = getHistory(processInstance);
    setComplaintHistory(history);
  }, [processInstance, getHistory]);

  return complaintHistory;
};

export default useComplaintHistory;
