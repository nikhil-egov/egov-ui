import Urls from "./urls";
import { GetCitiesWithi18nKeys, GetEgovLocations, Request } from "./utils";

export const PGRService = {
  search: (stateCode = "pb", fiters = {}) =>
    Request({
      url: Urls.pgr_search,
      useCache: false,
      userInfo: true,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId: stateCode, ...fiters },
    }),
  create: (details, stateCode = "pb") =>
    Request({
      url: Urls.MDMS,
      data: details,
      useCache: true,
      method: "POST",
      params: { tenantId: stateCode },
    }),
  update: (details, stateCode = "pb") =>
    Request({
      url: Urls.MDMS,
      data: details,
      useCache: true,
      method: "POST",
      params: { tenantId: stateCode },
    }),
  count: (details, stateCode = "pb") =>
    Request({
      url: Urls.MDMS,
      data: details,
      useCache: true,
      method: "POST",
      params: { tenantId: stateCode },
    }),
};
