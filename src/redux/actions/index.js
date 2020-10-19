import {
  FETCH_COMPLAINTS,
  FETCH_BUSINESS_SERVICE_BY_ID,
  FETCH_LOCALITIES,
} from "./types";
import { LocalizationService } from "../../@egovernments/digit-utils/services/Localization";
import { LocationService } from "../../@egovernments/digit-utils/services/Location";
import { LocalityService } from "../../@egovernments/digit-utils/services/Localities";
import { PGRService } from "../../@egovernments/digit-utils/services/PGR";
import { WorkflowService } from "../../@egovernments/digit-utils/services/WorkFlowService";

export const fetchLocalities = (city) => async (dispatch, getState) => {
  city = city.toLowerCase();
  const { stateInfo } = getState();
  let response = await LocationService.getLocalities({
    tenantId: `${stateInfo.code}.${city}`,
  });
  let localityList = LocalityService.get(response.TenantBoundary[0]);
  dispatch({
    type: FETCH_LOCALITIES,
    payload: { localityList },
  });
};

export const searchComplaints = (filters = {}) => async (
  dispatch,
  getState
) => {
  let city = "amritsar";
  const { stateInfo } = getState();
  let { ServiceWrappers } = await PGRService.search(
    `${stateInfo.code}.${city}`,
    filters
  );
  dispatch({
    type: FETCH_COMPLAINTS,
    payload: { complaints: ServiceWrappers },
  });
};

//on language change update localization resource with language selected(i18n store)
export const updateLocalizationResources = () => async (dispatch, getState) => {
  let city = "amritsar"; // TODO: fetch it from store
  const lng = getState().currentLanguage.language || "en";
  await LocalizationService.getLocale({
    modules: [`rainmaker-pb.${city}`],
    locale: lng,
    tenantId: `pb.${city}`,
  });
  await LocalizationService.getLocale({
    modules: ["rainmaker-common", "rainmaker-pgr"],
    locale: lng,
    tenantId: "pb",
  });
};

export const fetchBusinessServiceById = (businessId) => async (
  dispatch,
  getState
) => {
  console.log("getState:", getState());
  const businessServiceDetails = await WorkflowService.getByBusinessId(
    getState().cityCode,
    businessId
  );
  dispatch({
    type: FETCH_BUSINESS_SERVICE_BY_ID,
    payload: { businessServiceDetails },
  });
};
