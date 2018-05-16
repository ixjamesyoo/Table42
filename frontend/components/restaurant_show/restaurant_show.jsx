import React from "react";
import ReservationForm from "../reservation_form/reservation_form_container";
import ReviewForm from "../review_form/create_review_container";
import LoadingSpinner from "../loading_spinner/loading_spinner";
import { dollarSigns } from "../restaurant_index/restaurant_index_helper";


class RestaurantShow extends React.Component {
  constructor(props){
    super(props);
    this.handleReview = this.handleReview.bind(this);
  }

  componentDidMount(){
    this.props.fetchRestaurant();
    window.scrollTo(0,0);
  }

  handleReview(e){
    e.preventDefault();
    if (this.props.loggedIn){
      this.props.openCreateReview();
    } else {
      this.props.openLogin();
    }

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
            </ul>

            <ul className="review-details">
              <li>Overall: 5</li>
              <li>Food: 5</li>
              <li>Value: 4</li>
              <li>Service: 4</li>
              <li>Ambience: 5</li>
            </ul>
          </div>

          <p className="show-blurb">{ restaurant.description }</p>
        </div>

        <div>
          <button onClick={ this.handleReview }>
            Write a Review!
          </button>
        </div>
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
