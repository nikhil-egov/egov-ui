import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardText from "../../@egovernments/components/js/CardText";
import { getConfig } from "../../@egovernments/digit-utils/config";
import Pages from "../../@egovernments/digit-utils/enums/Pages";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";
import ComponentMap from "../../ComponentMap";
import { GetFunction } from "../../FunctionRegistry";
import { Renderer } from "../../Renderer";

const ComplaintTypeConfig = () => {
  const state = useSelector((state) => state.formData);
  const history = useHistory();

  //   const { handleSubmit, register } = useForm({ defaultValues: {} });

  const pageConfig = useSelector(
    (state) => state.config[Pages.PGR_COMPLAINT_TYPE]
  );
  const dispatch = useDispatch();

  const handleOnChange = (field) => (event) => {
    event.preventDefault();
    dispatch({ type: "UPDATE_REPEAT", payload: { field } });
  };

  const onSubmit = (e) => {
    if (e.redirectTo) {
      history.push(e.redirectTo);
    }
  };

  const handleSubmit = (e) => {
    console.log("handle submit", e);
  };

  const selected = (val) => {
    console.log("on click", val);
    Storage.set("complaintType", val.menuPath);
  };

  const configParams = {
    config: pageConfig,
    state,
    onChange: handleOnChange,
    handlesubmit: handleSubmit,
    selected: selected,
    onSubmit,
  };

  const config = useMemo(() => {
    return getConfig(ComponentMap, GetFunction, configParams);
  }, [configParams]);

  return (
    <Card>
      <CardHeader>Choose Complaint Type</CardHeader>
      <CardText>
        Select the option related to your complaint from the list given below.
        If the complaint type you are looking for is not listed select others.
      </CardText>
      <Renderer config={config} />
    </Card>
  );
};

export default ComplaintTypeConfig;
