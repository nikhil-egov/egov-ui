import { CREATE_COMPLAINT } from "../actions/types";

function complaintReducer(submitResponse = null, action) {
  if (action.type === CREATE_COMPLAINT) {
    return action.payload;
  } else {
    return submitResponse;
  }
}

export default complaintReducer;
