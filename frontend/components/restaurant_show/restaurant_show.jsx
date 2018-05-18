import React from "react";
import ReservationForm from "../reservation_form/reservation_form_container";
import ReviewForm from "../review_form/create_review_container";
import LoadingSpinner from "../loading_spinner/loading_spinner";
import { dollarSigns } from "../restaurant_index/restaurant_index_helper";
import ReviewIndex from "../review_index/review_index_container";
import FavoriteButton from "../favorite_button/favorite_button_container";

class RestaurantShow extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if (this.props.currentUser) {
      this.props.fetchFavorites(this.props.currentUser);
    }
    this.props.fetchRestaurant();
    window.scrollTo(0,0);
  }

  mainContent(){
    const { restaurant } = this.props;

    return (
      <div className="show-page-main">
        <div className="show-overview">

          <h1 className="show-title">{ restaurant.name }</h1>
          <div className="show-details">
            <ul className="rest-info">
              <li>{ restaurant.cuisines.join(" | ") }</li>
              <li>{ dollarSigns(restaurant.price_range) }</li><br/>
              <li>Address: { restaurant.address }</li>
              <li>Phone: { restaurant.phone_number }</li>
              <li>Opens at { restaurant.opening_time }</li>
              <li>Closes at { restaurant.closing_time }</li>
              <li id="recommendation-rate">
                <i className="fa fa-thumbs-up" aria-hidden="true"/>
                {`${Math.round(restaurant.recommendation_rate * 100)}% of diners recommend this establishment.`}
              </li>
            </ul>

            <ul className="review-details">
              <li id="show-favorite-container">
                <FavoriteButton restaurant={ restaurant }/>
              </li>
              <li>{`Overall: ${ restaurant.overall_rating }` }</li>
              <li>{`Food: ${ restaurant.food_rating }` }</li>
              <li>{`Value: ${ restaurant.value_rating }` }</li>
              <li>{`Service: ${ restaurant.service_rating }` }</li>
              <li>{`Ambience: ${ restaurant.ambience_rating }` }</li>

            </ul>
          </div>
          <p className="show-blurb">{ restaurant.description }</p>
        </div>

        <ReviewIndex/>
      </div>
    );
  }

  render() {
    const { restaurant, errors, loading } = this.props;
    if (loading) return (
      <div className="show-loading">
        <LoadingSpinner/>
      </div>
    );
    if (!restaurant || !restaurant.fetched) return null;

    return (
      <div className="show-page-master">
        <div className="show-page-bg"><img
          src={ window.images.showBackground } className="show-page-bg-image" alt="table-42-bg"
          /></div>
        <div className="show-page-and-form">
          { this.mainContent() }

          <div className="show-page-reservation">
            <ReservationForm />
          </div>
        </div>
      </div>
    );

  }
}

export default RestaurantShow;
