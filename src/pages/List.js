import React from "react";
import { useSelector } from "react-redux";
import Pages from "../@egovernments/digit-utils/enums/Pages";
import { SearchService } from "../@egovernments/digit-utils/services/Search";
import ResultTable from "../@egovernments/react-components/ResultTable";

const ListPage = () => {
  const pageConfig = useSelector((state) => state.config[Pages.PGR_LIST]);
  const result = SearchService.get();
  const popHandler = (property) => {
    alert("Property ID " + property.acknowldgementNumber);
  };

  const HistorySvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      width="24px"
      height="24px"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
    </svg>
  );

  return (
    <div>
      Complaints List
      <ResultTable
        data={result.Properties}
        config={pageConfig.resultTable}
        last={{ title: "History", onClick: popHandler, element: HistorySvg }}
      />
      <pre>{JSON.stringify(pageConfig, null, 2)}</pre>
    </div>
  );
};

export default ListPage;
