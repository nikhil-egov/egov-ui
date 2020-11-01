import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardCaption from "../../@egovernments/components/js/CardCaption";
import CardText from "../../@egovernments/components/js/CardText";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Storage } from "../../@egovernments/digit-utils/services/Storage";
import { useTranslation } from "react-i18next";
import { Renderer } from "../../Renderer";
import { getConfig } from "../../@egovernments/digit-utils/config";
import Pages from "../../@egovernments/digit-utils/enums/Pages";
import ComponentMap from "../../ComponentMap";
import { GetFunction } from "../../FunctionRegistry";
import { useForm } from "react-hook-form";

const SubType = () => {
  const state = useSelector((state) => state.formData);
  const history = useHistory();

  const { handleSubmit, register, errors } = useForm({ defaultValues: {} });

  const pageConfig = useSelector(
    (state) => state.config[Pages.PGR_COMPLAINT_SUBTYPE]
  );
  const dispatch = useDispatch();

  const handleOnChange = (field) => (event) => {
    event.preventDefault();
    dispatch({ type: "UPDATE_REPEAT", payload: { field } });
  };

  const onSubmit = (e, redirectTo) => {
    console.log("submitting.....");
    if (redirectTo) {
      history.push(redirectTo);
    }
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
    register,
    onSubmit: onSubmit,
  };

  const config = useMemo(() => {
    return getConfig(ComponentMap, GetFunction, configParams);
  }, [configParams]);

  return (
    <Card>
      {console.log("config::::>>>>>>>>>>>>>>>>>>>>>>33", config)}
      <CardHeader>Choose Complaint Sub-Type</CardHeader>
      <CardText>
        The complaint type you have chosen has following complaint sub-types.
        Select the option of your choice from the list given below.
      </CardText>

      {config && <Renderer config={config} />}

      <div style={{ color: "red" }}>
        {errors.complaint_type && errors.complaint_type.type === "required"
          ? "Complaint type is required"
          : ""}
      </div>
    </Card>
  );
};

export default SubType;
