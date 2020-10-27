import React, { useState } from "react";
import Card from "../../@egovernments/components/js/Card";
import CardHeader from "../../@egovernments/components/js/CardHeader";
import CardLabel from "../../@egovernments/components/js/CardSubHeader";
import Rating from "../../@egovernments/components/js/Rating";
import CheckBox from "../../@egovernments/components/js/CheckBox";
import TextArea from "../../@egovernments/components/js/TextArea";
import SubmitBar from "../../@egovernments/components/js/SubmitBar";

const RatingAndFeedBack = (props) => {
  let selection = [];
  let comment = null;

  const [rating, setRating] = useState(0);

  function onSelect(e) {
    selection = [...selection, e.target.value];
  }

  function onComments(e) {
    comment = e.target.value;
  }

  function feedback(e, ref, index) {
    setRating(index);
  }

  function submit() {
    console.log(selection, comment, rating);
  }

  return (
    <React.Fragment>
      <Card>
        <CardHeader>Help Us Help You</CardHeader>
        <CardLabel>How would you rate your experience with us?</CardLabel>
        <Rating
          currentRating={rating}
          maxRating={5}
          onFeedback={(e, ref, i) => feedback(e, ref, i)}
        />
        <CardLabel>What was good?</CardLabel>
        <CheckBox onChange={onSelect} label="Service" />
        <CheckBox onChange={onSelect} label="Resolution time" />
        <CheckBox onChange={onSelect} label="Quality of work" />
        <CheckBox onChange={onSelect} label="Others" />
        <CardLabel>Comments</CardLabel>
        <TextArea onChange={onComments}></TextArea>
        <SubmitBar label="Submit" onSubmit={submit} />
      </Card>
    </React.Fragment>
  );
};

export default RatingAndFeedBack;
