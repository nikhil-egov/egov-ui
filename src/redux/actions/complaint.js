import Axios from "axios";
import { CREATE_COMPLAINT } from "./types";

const createComplaint = (complaintParams) => async (dispatch, getState) => {
  var config = {
    method: "post",
    url: "/pgr-services/v2/request/_create",
    headers: {
      "Content-Type": "application/json",
    },
    data: complaintParams,
  };

  const res = await Axios(config);
  dispatch({
    type: CREATE_COMPLAINT,
    payload: res.data,
  });
};

export default createComplaint;
