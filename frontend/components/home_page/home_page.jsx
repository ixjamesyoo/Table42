import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../restaurant_search/restaurant_searchbar_container";

// will need a search bar component, top cuisines, featured cities

// gameplan for fri:
// create search bar
// create links for cities


export default () => {
  return (
    <section className="home-page-container">
      <h1>We out here boy!!! Homepage legit AFFF</h1>
      <SearchBar/>
    </section>
  );
};
