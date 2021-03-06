import React from "react";

const Form = ({ onSubmit, handlesubmit, children, ...props }) => {
  const submitForm = async (data) => {
    const beforeSubmit = props["before-submit"];
    let newData = data;
    if (beforeSubmit && window[beforeSubmit]) {
      newData = await window[beforeSubmit](JSON.parse(JSON.stringify(data)));
    }
    onSubmit(data, props.redirectto);
  };
  return (
    <form onSubmit={handlesubmit(submitForm)} {...props}>
      {children}
    </form>
  );
};

export default Form;
