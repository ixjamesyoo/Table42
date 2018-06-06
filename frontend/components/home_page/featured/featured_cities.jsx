import React from "react";
import { Link } from "react-router-dom";

export default () => {

  const cities = [
    "New York City",
    "Los Angeles",
    "San Francisco",
    "Seattle",
    "Chicago",
    "Washington DC"
  ];

  const url = city => `/restaurants/search?city=${city.split(" ").join("+")}`;
  const cityClass = city => city.split(" ").map( frag => frag.toLowerCase() ).join("-");

  const cityLis = cities.map( city => {

    return (
      <Link to={ url(city) } key={ city } className="position-relative-parent">
        <li className={ "featured-city-item " }>

          <p className="featured-city-name">{ city }</p>

        </li>
        <div className="position-absolute-child">
          <img src={ window.images.cities[city] }
            className="featured-city-photos-item" alt="nyc-table42" />
        </div>
      </Link>
    );
  });


  return (
    <div className="featured-city-container">
      <header className="featured-city-header">
        <h3 className="featured-city-header-text">Featured Areas</h3>
      </header>
      <ul className="featured-city-list">
        { cityLis }
      </ul>
    </div>
  );
};
