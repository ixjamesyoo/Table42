import React from "react";
import LoadingSpinner from "../loading_spinner/loading_spinner";
import ReviewIndexItem from "../review_index/review_index_item";

export default class ProfilePage extends React.Component {
  componentDidMount() {
    const { fetchUserProfile, userId } = this.props;
    fetchUserProfile(userId);
  }

  profileReviews() {
    const { reviews, userId, restaurants } = this.props;

    return reviews.review_ids.map(id => (
      <div key={id}>
        <h3>{`Regarding ${restaurants[reviews[id]["restaurant_id"]]["name"]}`}</h3>
        <ReviewIndexItem review={ reviews[id] } currentUserId={ userId }/>
      </div>
    ));

  }

  render(){
    const { loading, currentUser } = this.props;

    if (loading) return (
      <div className="profile-loading">
        <LoadingSpinner/>
      </div>
    );
    if (!currentUser || !currentUser.fetched) return null;

    return (
      <div className="profile-master">
        <div className="profile-reviews">
          <h3>My Reviews</h3>
          { this.profileReviews() }
        </div>
      </div>
    );


  }
}
