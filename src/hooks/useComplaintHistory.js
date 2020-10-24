import React, { useCallback, useEffect, useState } from "react";
import { Rate } from "../components/rate";
import { ReOpen } from "../components/reopen";

const useComplaintHistory = (processInstance) => {
  const [complaintHistory, setComplaintHistory] = useState([]);

  const getNextState = (obj) => {
    const key = obj.state.applicationStatus;
    console.log("obj:----->", obj, key);

    switch (key) {
      case "PENDINGATLME":
        let assignes = obj.assignes != null && obj.assignes[0];
        console.log("obj.assignes:---->", assignes);
        let { name, mobileNumber } = assignes;
        return (
          name &&
          mobileNumber && (
            <>
              <span>
                assigned to {name} {mobileNumber}
              </span>
              <br />
              {/* <>
                <ReOpen id={obj.businessId} /> <Rate />
              </> */}
            </>
          )
        );
      case "RESOLVED":
        return (
          <>
            <ReOpen id={obj.businessId} /> <Rate />
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
