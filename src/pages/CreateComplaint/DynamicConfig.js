import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getConfig } from "../../@egovernments/digit-utils/config";
import { Renderer } from "../../Renderer";
import { GetFunction } from "../../FunctionRegistry";
import ComponentMap from "../../ComponentMap";
import Pages from "../../@egovernments/digit-utils/enums/Pages";

const DynamicConfig = (props) => {
  const configState = useSelector((state) => state.config);
  const appState = useSelector((state) => state);
  console.log("configState", configState);

  function abcd() {
    console.log("im here");
  }

  function onSubmit() {
    console.log("im here");
  }

  const configParams = {
    config: configState[Pages.TEST],
    appState,
    onChange: abcd,
    handlesubmit: abcd,
    selected: abcd,
    onSubmit,
  };

  const config = useMemo(() => {
    return getConfig(ComponentMap, GetFunction, configParams);
  }, [configParams]);

  return (
    <React.Fragment>
      <Renderer config={config} />
    </React.Fragment>
  );
};

export default DynamicConfig;
