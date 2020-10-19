import { useCallback, useEffect, useState } from "react";

const useComplaintHistory = (processInstance, creationDetails) => {
  const [complaintHistory, setComplaintHistory] = useState([]);

  const getHistory = useCallback(
    (processInstance) => {
      if (Object.keys(processInstance).length > 0 && creationDetails) {
        let { ProcessInstances } = processInstance;
        ProcessInstances = [...ProcessInstances];
        let history = ProcessInstances.map((instance) => {
          return {
            applicationStatus: instance.state.applicationStatus,
            text: "",
          };
        });
        history = [
          ...history,
          {
            applicationStatus: "Complaint Filed",
            createTime: "123478888",
          },
        ];
        return history;
      }
    },
    [creationDetails]
  );

  useEffect(() => {
    const history = getHistory(processInstance);
    setComplaintHistory(history);
  }, [processInstance, getHistory]);

  return complaintHistory;
};

export default useComplaintHistory;
