import Urls from "./urls";
import { Request } from "./utils";

export const WorkflowService = {
  init: (stateCode = "pb", businessServices) =>
    Request({
      url: Urls.WorkFlow,
      useCache: false,
      method: "POST",
      params: { tenantId: stateCode, businessServices },
      auth: true,
    }),

  getByBusinessId: (stateCode = "pb", businessIds) =>
    Request({
      url: Urls.WorkFlowProcessSearch,
      useCache: false,
      method: "POST",
      params: { tenantId: stateCode, businessIds: businessIds, history: true },
      auth: true,
    }),
};
