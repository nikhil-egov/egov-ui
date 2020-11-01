import Axios from "axios";
import { connectAdvanced } from "react-redux";
import { Storage } from "./Storage";

Axios.interceptors.request.use((req) => {
  document.body.classList.add("loader");
  return req;
});

Axios.interceptors.response.use(
  (res) => {
    document.body.classList.remove("loader");
    return res;
  },
  (err) => {
    document.body.classList.remove("loader");
    return err;
  }
);

export const Request = async ({
  method = "POST",
  url,
  data = {},
  useCache = false,
  params = {},
}) => {
  let key = "";
  if (method.toUpperCase() === "POST") {
    data.RequestInfo = {
      apiId: "Rainmaker",
    };
  }
  if (useCache) {
    key = `${method.toUpperCase()}.${url}.${JSON.stringify(
      params,
      null,
      0
    )}.${JSON.stringify(data, null, 0)}`;
    const value = Storage.get(key);
    if (value) {
      return value;
    }
  } else {
    params._ = Date.now();
  }

  const res = await Axios({ method, url, data, params });
  if (useCache) {
    Storage.set(key, res.data);
  }

  return res.data;
};

export const SortByName = (na, nb) => {
  if (na < nb) {
    return -1;
  }
  if (na > nb) {
    return 1;
  }
  return 0;
};

export const TransformArrayToObj = (traslationList) => {
  return traslationList.reduce(
    // eslint-disable-next-line
    (obj, item) => ((obj[item.code] = item.message), obj),
    {}
  );
  // return trasformedTraslation;
};

export const GetCitiesWithi18nKeys = (MdmsRes, moduleCode) => {
  const cityList =
    (MdmsRes.tenant.citymodule &&
      MdmsRes.tenant.citymodule.filter(
        (module) => module.code === moduleCode
      )[0].tenants) ||
    [];
  const citiesMap = cityList.map((city) => city.code);
  const cities = MdmsRes.tenant.tenants
    .filter((city) => citiesMap.includes(city.code))
    .map(({ code, name, logoId, emailId, address, contactNumber }) => ({
      code,
      name,
      logoId,
      emailId,
      address,
      contactNumber,
      i18nKey: "TENANT_TENANTS_" + code.replace(".", "_").toUpperCase(),
    }))
    .sort((cityA, cityB) => {
      const na = cityA.name.toLowerCase(),
        nb = cityB.name.toLowerCase();
      return SortByName(na, nb);
    });
  return cities;
};

export const GetEgovLocations = (MdmsRes) => {
  return MdmsRes["egov-location"].TenantBoundary[0].boundary.children.map(
    (obj) => ({
      name: obj.localname,
      i18nKey: obj.localname,
    })
  );
};

export const GetServiceDefinitions = async (MdmsRes) => {
  return MdmsRes["RAINMAKER-PGR"].ServiceDefs.filter(
    (serviceDef) => serviceDef.active === true
  ).map((serviceDef) => ({
    menuPath: serviceDef.menuPath,
    serviceCode: serviceDef.serviceCode,
  }));
};
