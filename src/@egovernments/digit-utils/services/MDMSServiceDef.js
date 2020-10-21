import Urls from "./urls";
import { Request } from "./utils";

export async function getServiceDefinition(stateCode) {
  const requestData = {
    RequestInfo: {
      apiId: "Rainmaker",
      ver: ".01",
      ts: "",
      action: "_search",
      did: "1",
      key: "",
      msgId: "20170310130900|en_IN",
      authToken: "184c3052-4bd0-493f-bb5c-81fd3d01a22c",
    },
    MdmsCriteria: {
      tenantId: stateCode,
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PGR",
          masterDetails: [
            {
              name: "ServiceDefs",
            },
          ],
        },
      ],
    },
  };

  return await Request({
    url: Urls.MDMS,
    data: requestData,
    useCache: true,
    method: "POST",
    params: {
      tenantId: stateCode,
    },
  });
}
