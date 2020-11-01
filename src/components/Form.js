import React from "react";

const Form = ({ onSubmit, handlesubmit, children, ...props }) => {
  {
    //console.log("config::::>>>>>>>>>>>>>>>>>>>>>>1", handlesubmit);
  }
  const submitForm = async (data) => {
    debugger;
    const beforeSubmit = props["before-submit"];
    let newData = data;
    if (beforeSubmit && window[beforeSubmit]) {
      newData = await window[beforeSubmit](JSON.parse(JSON.stringify(data)));
    }
    console.log("form submit", data, newData);
    onSubmit(data, props.redirectto);
  };
  return (
    <form onSubmit={handlesubmit(submitForm)} {...props}>
      {console.log("config::::>>>>>>>>>>>>>>>>>>>>>>2")}
      {children}
    </form>
  );
};

export default Form;
