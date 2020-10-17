import React, { useRef } from "react";
import starfilled from "../svg/starfilled.svg";
import starempty from "../svg/starempty.svg";

const Rating = (props) => {
  var stars = [];
  const star = useRef(null);

  for (var i = 1; i <= props.maxRating; i++) {
    if (i <= props.currentRating) {
      stars.push(
        <img
          key={i}
          src={starfilled}
          className="rating-star"
          alt="star filled"
          ref={star}
          onClick={(e, ref) => props.onFeedback(e, ref)}
        />
      );
    } else {
      stars.push(
        <img
          key={i}
          src={starempty}
          className="rating-star"
          alt="star empty"
          ref={star}
          onClick={(e, ref) => props.onFeedback(e, ref)}
        />
      );
    }
  }

  return <div className="rating-star-wrap">{stars}</div>;
};

export default Rating;
