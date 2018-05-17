import React from "react";
import { Link } from "react-router-dom";
import { dollarSigns } from "./restaurant_index_helper";

const RestaurantIndexItem = ({ restaurant }) => {
  const cuisineText = restaurant.cuisines.join(" | ");

  const photoName = restaurant.cuisines[0];
  return (
    <div className="search-result">
      <Link to={ `/restaurants/${restaurant.id}` }><img
        className="restaurant-icon clearfix"
        src={ window.images.stockPhotos[photoName]}/></Link>

      <section className="search-result-restaurant">
        <Link to={ `/restaurants/${restaurant.id}` }><h3
          className="restaurant-name">{ restaurant.name }</h3></Link>

        <ul>
          <li className="restaurant-overview">{ cuisineText }</li>
          <li>{ dollarSigns(restaurant.price_range) }</li>
          <li className="restaurant-overview">{ restaurant.address }</li>
        </ul>

        <section className="search-result-reservation-section">
          <button className="navbar-button demo-button">BUTTON</button>
          <button className="navbar-button demo-button">BUTTON</button>
          <button className="navbar-button demo-button">BUTTON</button>
          <button className="navbar-button demo-button">BUTTON</button>
          <button className="navbar-button demo-button">BUTTON</button>
          <button className="navbar-button demo-button">BUTTON</button>
        </section>
      </section>

    </div>
  );
};

export default RestaurantIndexItem;
