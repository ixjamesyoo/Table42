import React from "react";

export default ({ review, currentUserId }) => {

  // const editButton = () => {
  //   return currentUserId === review.user_id ?
  //     <button>Click Me</button> : null;
  // };

  return (
    <div className="review-item-container">
      <p className="review-item-author">{ `${review.author} says:`}</p>
      <div className="review-item-ratings">
        <li>{`Overall: ${ review.overall_rating }` }</li>
        <li>{`Food: ${ review.food_rating }` }</li>
        <li>{`Value: ${ review.value_rating }` }</li>
        <li>{`Service: ${ review.service_rating }` }</li>
        <li>{`Ambience: ${ review.ambience_rating }` }</li>
      </div>
      <p className="review-item-body">{ review.body }</p>
    </div>
  );
};
