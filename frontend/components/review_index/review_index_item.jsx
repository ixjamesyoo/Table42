import React from "react";

export default ({ review, currentUserId, deleteReview }) => {

  const handleDelete = (id) => {
    return () => deleteReview(id);
  };

  const deleteButton = () => {
    return currentUserId === review.user_id ?
      <button
        onClick={ handleDelete(review.id) }
        className="review-item-delete-button">
        Delete Review
      </button> : null;
  };

  return (
    <div className="review-item-container">
      <div className="review-item-top">
        <p className="review-item-author">{ `${review.author} says:`}</p>
        { deleteButton() }
      </div>
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
