import React from "react";
import ReviewIndexItem from "./review_index_item";

export default class ReviewIndex extends React.Component {
  constructor(props){
    super(props);
    this.handleReview = this.handleReview.bind(this);
  }

  handleReview(e){
    e.preventDefault();

    if (!this.props.loggedIn) {
      this.props.openLogin();
    } else {
      const { reviews, currentUserId } = this.props;
      const reviewId = reviews.review_ids.find(id => currentUserId === reviews[id].user_id);

      if (reviewId){
        this.props.clearReviewConfirmation();
        this.props.openEditReview(reviewId);
      } else {
        this.props.clearReviewConfirmation();
        this.props.openCreateReview();
      }
    }
  }

  reviewButton() {
    const { reviews, currentUserId } = this.props;

    const buttonText = reviews.review_ids.some(id => {
      return currentUserId === reviews[id].user_id;
    }) ? "Edit Review!" : "Write a Review!";

    return (
      <button className="write-review-button" onClick={ this.handleReview }>
        { buttonText }
      </button>
    );
  }

  displayReviewConfirmation() {
    if (this.props.reviewConfirmation) {
      return (
        <span className="review-confirmation">Review submitted.</span>
      );
    } else {
      return null;
    }
  }

  reviewItems(){
    const { reviews, currentUserId, restaurant } = this.props;
    return reviews.review_ids.map(id => (
      <ReviewIndexItem id={ id } key={ id }
        review={ reviews[id] }
        currentUserId={ currentUserId }/>
    ));
  }

  render() {
    const { restaurant } = this.props;

    return (
      <div className="review-master">
        <header>
          <h3 className="review-master-banner">{ `${restaurant.name} Ratings and Reviews` }</h3>
          { this.displayReviewConfirmation() }
          { this.reviewButton() }
        </header>

        <ul className="reviews-container">
          { this.reviewItems()}
        </ul>
      </div>
    );

  }
}
