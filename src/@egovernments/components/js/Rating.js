import React, { useRef } from "react";
import starfilled from "../svg/starfilled.svg";
import starempty from "../svg/starempty.svg";

const Rating = (props) => {
  var stars = [];
  const star = useRef(null);

  for (var i = 1; i <= props.maxRating; i++) {
    if (i <= props.currentRating) {
      const index = i;
      stars.push(
        <img
          key={index}
          src={starfilled}
          className="rating-star"
          alt="star filled"
          ref={star}
          onClick={(e) => props.onFeedback(e, star, index)}
        />
      );
    } else {
      const index = i;
      stars.push(
        <img
          key={index}
          src={starempty}
          className="rating-star"
          alt="star empty"
          ref={star}
          onClick={(e) => props.onFeedback(e, star, index)}
        />
      );
    }
  }
  return <div className="rating-star-wrap">{stars}</div>;
};

export default Rating;
