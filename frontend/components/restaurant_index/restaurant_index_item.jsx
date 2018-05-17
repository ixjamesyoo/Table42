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

        <ul className="res-ul">
          <li className="restaurant-overview">{ cuisineText }</li>
          <li>{ dollarSigns(restaurant.price_range) }</li>
          <li className="restaurant-overview">{ restaurant.address }</li>
        </ul>

        <ul className="other-info">
          <p id="index-overall">{`Overall Rating: ${ restaurant.overall_rating }` }</p>
          <p id="index-recommend">
            <i className="fa fa-thumbs-up" aria-hidden="true"/>
            {`${Math.round(restaurant.recommendation_rate * 100)}% of diners recommend this establishment.`}
          </p>
        </ul>
      </section>

    </div>
  );
};

export default RestaurantIndexItem;
