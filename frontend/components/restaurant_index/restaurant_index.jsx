import React from "react";
import { Link } from "react-router-dom";
import { parseQuery } from "./restaurant_index_helper";
import SearchBar from "../restaurant_search/restaurant_searchbar_container";

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
        <p className="search-error-text">{ this.props.errors[0] }</p>
      </div>
    );
  }

  displayRestaurants() {
    if (this.props.errors.length) return null;
    const { restaurants } = this.props;
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
      <div className="index-page-container">
        <SearchBar />
        { this.displayErrors() }
        { this.displayRestaurants() }
      </div>
    );
  }
}
