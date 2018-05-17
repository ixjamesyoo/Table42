import React from "react";
import ReviewIndexItem from "./review_index_item";

export default class ReviewIndex extends React.Component {
  constructor(props){
    super(props);
    this.handleReview = this.handleReview.bind(this);
  }

  handleReview(e){
    e.preventDefault();
    if (this.props.loggedIn){
      this.props.clearReviewConfirmation();
      this.props.openCreateReview();
    } else {
      this.props.openLogin();
    }
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
          <button className="write-review-button" onClick={ this.handleReview }>
            Write a Review!
          </button>
        </header>

        <ul className="reviews-container">
          { this.reviewItems()}
        </ul>
      </div>
    );

  }
}
