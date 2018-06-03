import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import LoadingSpinner from "../loading_spinner/loading_spinner";
import ReviewIndexItem from "../review_index/review_index_item";
import RestaurantIndexItem from "../restaurant_index/restaurant_index_item";

export default class ProfilePage extends React.Component {
  componentDidMount() {
    const { fetchUserProfile, userId } = this.props;
    fetchUserProfile(userId);
  }

  profileReviews() {
    const { reviews, userId, restaurants } = this.props;
    return reviews.review_ids.map(id => (
      <div key={id}>
        <Link to={ `/restaurants/${reviews[id].restaurant_id}` }>
          <h3 className="review-title"><span>{ `${restaurants[reviews[id]["restaurant_id"]]["name"]}`}</span></h3>
        </Link>
        <ReviewIndexItem review={ reviews[id] } currentUserId={ userId }/>
      </div>
    ));
  }

  profileFavorites(){
    const { restaurants, favorites } = this.props;
    return favorites.map(id => (
      <RestaurantIndexItem key={id} restaurant={ restaurants[id] }/>
    ));
  }

  pastReservations() {
    const past = [];
    const today = new Date();
    const { reservations, restaurants } = this.props;

    reservations.reservation_ids.forEach(id => {
      if(today > new Date(reservations[id].start_datetime)) {
        past.push(id);
      }
    });

    return past.map(id => (
      <div key={id}>
        <h3 className="reservation-title">{`${reservations[id].parsed_datetime}`}</h3>
        <RestaurantIndexItem restaurant={ restaurants[reservations[id].restaurant_id] }/>
      </div>
    ));
  }

  upcomingReservations() {
    const upcoming = [];
    const today = new Date();
    const { reservations, restaurants } = this.props;

    reservations.reservation_ids.forEach(id => {
      if(today < new Date(reservations[id].start_datetime)) {
        upcoming.push(id);
      }
    });

    return upcoming.map(id => (
      <div key={id}>
        <h3 className="reservation-title">{`${reservations[id].parsed_datetime}`}</h3>
        <RestaurantIndexItem restaurant={ restaurants[reservations[id].restaurant_id] }/>
      </div>
    ));
  }

  render(){
    const { loading, currentUser, restaurants, reviews, reservations, favorites } = this.props;

    if (loading) return (
      <div className="profile-loading">
        <LoadingSpinner/>
      </div>
    );
    if (!currentUser || !restaurants.profile_restaurant_ids) return null;

    return (
      <div className="profile-master">
        <nav className="profile-overview">
          <h2>{ currentUser.full_name }</h2>
          <section className="profile-links">
            <HashLink to="/my/profile#upcoming-reservations">
              <p>{ `${this.upcomingReservations().length} Upcoming Reservations` }</p>
            </HashLink>
            <HashLink to="/my/profile#past-reservations">
              <p>{ `${this.pastReservations().length} Past Reservations` }</p>
            </HashLink>
            <HashLink to="/my/profile#favorites">
              <p>{ `${favorites.length} Favorites` }</p>
            </HashLink>
            <HashLink to="/my/profile#reviews">
              <p>{ `${reviews.review_ids.length} Reviews` }</p>
            </HashLink>
          </section>
        </nav>


        <div id="upcoming-reservations" className="content">
          <h2>Upcoming Reservations</h2>
          { this.upcomingReservations().length ?
            this.upcomingReservations() :
            <p className="null-profile-text">No upcoming reservations!</p> }
        </div>

        <div className="spacer" id="past-reservations">&nbsp;</div>
        <div className="content">
          <h2>Past Reservations</h2>
          { this.pastReservations().length ?
            this.pastReservations() :
            <p className="null-profile-text">No past reservations!</p> }
        </div>

        <div className="spacer" id="favorites">&nbsp;</div>
        <div className="content">
          <h2>My Favorites</h2>
          { this.profileFavorites().length ?
            this.profileFavorites() :
            <p className="null-profile-text">No favorites yet!</p> }
        </div>

        <div className="spacer" id="reviews">&nbsp;</div>
        <div className="content" id="profile-reviews">
          <h2>My Reviews</h2>
          { this.profileReviews().length ?
            this.profileReviews() :
            <p className="null-profile-text">No reviews posted yet!</p> }
        </div>
      </div>
    );
  }
}
