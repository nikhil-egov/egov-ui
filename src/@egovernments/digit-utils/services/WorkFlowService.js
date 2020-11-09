import { Storage } from "./Storage";
import Urls from "./urls";
import { Request } from "./utils";

export const WorkflowService = {
  init: (stateCode = "pb", businessServices = "PGR") =>
    Request({
      url: Urls.WorkFlow,
      useCache: true,
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
  getNextAction: async (stateCode = "pb", currentState) => {
    let role = Storage.get("role") || "CITIZEN";
    let res = await WorkflowService.init(stateCode, "PGR");
    let selectedState = res.BusinessServices[0].states.filter((state) => {
      return state.state === currentState;
    })[0];
    let actions =
      (selectedState.actions &&
        selectedState.actions.filter((state) => {
          return state.roles.includes(role);
        })) ||
      [];
    return actions;
  },
};
