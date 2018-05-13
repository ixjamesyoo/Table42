import React from "react";
import { Link } from "react-router-dom";
import { parseQuery } from "./restaurant_index_helper";
import SearchBar from "../restaurant_search/restaurant_searchbar_container";
import RestaurantIndexItem from "./restaurant_index_item";

export default class RestaurantIndex extends React.Component {
  componentDidMount() {
    const queryString = this.props.location.search.slice(1);
    this.props.searchRestaurants(parseQuery(queryString));
  }

  componentWillReceiveProps(nextProps) {
    const queryString = (location) => location.search.slice(1);

    if (queryString(this.props.location) !== queryString(nextProps.location)){
      this.props.searchRestaurants(parseQuery(queryString(nextProps.location)));
    }
  }

  displayErrors() {
    if (!this.props.errors.length) return null;
    return (
      <div className="search-error-container">
        <span className="search-error-text">{ this.props.errors[0] }</span>
      </div>
    );
  }

  displayRestaurants() {
    const { restaurants } = this.props;
    if (!restaurants.restaurantIds || this.props.errors.length) return null;

    const indexItems = restaurants.restaurantIds.map( id => (
      <RestaurantIndexItem key={ id } restaurant={ restaurants[id] } />
    ));
    return (
      <div className="search-results-container">
        { indexItems }
      </div>
    );
  }

  render(){
    return (
      <div className="main-page">
        <SearchBar />
        <main className="index-page-main">

          <ul>
            <li>Some filter</li>
            <li>Some other filter</li>
            <li>ANOTHA ONE</li>
          </ul>

          { this.displayErrors() }
          { this.displayRestaurants() }
        </main>
      </div>
    );
  }
}
