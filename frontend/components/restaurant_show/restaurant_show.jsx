import React from "react";
import LoadingSpinner from "../loading_spinner/loading_spinner";
import { dollarSigns } from "../restaurant_index/restaurant_index_helper";

class RestaurantShow extends React.Component {
  componentDidMount(){
    this.props.fetchRestaurant();
  }

  mainContent(){
    const { restaurant } = this.props;

    return (
      <div className="show-page-main">
        <div className="show-overview">

          <h1 className="show-title">{ restaurant.name }</h1>

          <ul className="show-details">
            <li>{ restaurant.cuisines.join(" | ") }</li>
            <li>{ dollarSigns(restaurant.price_range) }</li>
            <li>{ restaurant.address }</li>
            <li>{ restaurant.phone_number }</li>
            <li>{ restaurant.opening_time }</li>
            <li>{ restaurant.closing_time }</li>
          </ul>

          <p>{ restaurant.description }</p>
        </div>
      </div>
    );
  }

  render() {
    const { restaurant, errors, loading } = this.props;
    if (loading) return <LoadingSpinner/>;
    if (!restaurant || !restaurant.fetched) return null;

    return (
      <div className="show-page-master">
        <div className="possibly-some-photos"></div>
        { this.mainContent() }


        <form className="show-page-reservation">
        </form>
      </div>
    );

  }
}

export default RestaurantShow;
