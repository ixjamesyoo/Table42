import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../restaurant_search/restaurant_searchbar_container";
import FeaturedCities from "./featured/featured_cities";


export default () => {
  return (
    <section className="home-page-container">
      <div className="home-page-bg"><img
        src={ window.images.homeBackground } className="home-page-bg-image" alt="table-42-bg"
        /></div>
      <ul className="home-page-components">
        <SearchBar/>
        <FeaturedCities/>
      </ul>
    </section>
  );
};
