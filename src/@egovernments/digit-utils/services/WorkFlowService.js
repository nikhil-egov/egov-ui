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
};
