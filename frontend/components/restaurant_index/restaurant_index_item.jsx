import React from "react";
import { Link } from "react-router-dom";

const RestaurantIndexItem = ({ restaurant }) => {
  const cuisineText = restaurant.cuisines.join(" | ");

  return (
    <div className="search-result">
      <Link to={ `/restaurants/${restaurant.id}` }><img
        className="restaurant-icon clearfix"
        src={ window.images.dummyPhoto }/></Link>

      <section className="search-result-restaurant">
        <Link to={ `/restaurants/${restaurant.id}` }><h3
          className="restaurant-name">{ restaurant.name }</h3></Link>

        <ul className="restaurant-overview">
          <li>Address: { restaurant.address }</li>
          <li>{ restaurant.price_range }</li>
          <li>{ cuisineText }</li>
        </ul>
        <p>{ restaurant.description }</p>
      </section>

      <section className="reservation-buttons-section">
        <button className="navbar-button demo-button">BUTTON</button>
        <button className="navbar-button demo-button">BUTTON</button>
        <button className="navbar-button demo-button">BUTTON</button>
      </section>
    </div>
  );
};

export default RestaurantIndexItem;
