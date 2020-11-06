import { useCallback, useEffect, useState } from "react";
import { MdmsService } from "../../digit-utils/services/MDMS";
import { Storage } from "../../digit-utils/services/Storage";

export const useData = (criteria) => {
  const [data, setdata] = useState([]);

  const handleSubmenu = useCallback(() => {
    const subTypeKey = Storage.get("complaintType");
    const subMenuIds = Storage.get("ServiceDefs");
    let submenu = [];
    if (subMenuIds) {
      submenu = subMenuIds.filter((def) => def.menuPath === subTypeKey);
    }
    return submenu;
  }, []);

  const getUnique = useCallback((list) => {
    let menuIds = [];
    list.forEach((def) => {
      if (!menuIds.find((e) => e.menuPath === def.menuPath)) {
        if (def.menuPath === "") {
          menuIds.push(def);
          // menuIds.push("SERVICEDEFS.OTHERS");
        } else {
          menuIds.push(def);
        }
      }
    });
    return menuIds;
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (criteria && criteria.type === "serviceDef") {
        let list = criteria
          ? await MdmsService.getDataByCriteria(criteria)
          : [];
        const unique = getUnique(list);
        setdata(unique);
      } else if (criteria && criteria.type === "sessionStorage") {
        if (criteria.action === "complaint-subtype") {
          const menuData = handleSubmenu();
          setdata(menuData);
        }
      }
    }
    fetchData();
  }, [criteria, getUnique, handleSubmenu]);
  return data;
};
