import React from "react";
import { Link } from "react-router-dom";
import { parseQuery, PRICE_OPTIONS, CUISINE_OPTIONS } from "./restaurant_index_helper";
import SearchBar from "../restaurant_search/restaurant_searchbar_container";
import RestaurantIndexItem from "./restaurant_index_item";
import SearchFilter from "../search_filter/search_filter";

export default class RestaurantIndex extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);

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
    const { restaurants, location } = this.props;
    if (!restaurants.restaurantIds || this.props.errors.length) return null;
    let indexItems;

    if (location.hash) {
      


    } else {
      indexItems = restaurants.restaurantIds.map( id => (
        <RestaurantIndexItem key={ id } restaurant={ restaurants[id] } />
      ));

      return (
        <div className="search-results-container">
          { indexItems }
        </div>
      );
    }
  }

  render(){
    return (
      <div className="main-page">
        <SearchBar />
        <div className="index-page-main">

          <ul>
            <div className="price-filter-container">
              <SearchFilter filterType="price_range" choicesArray={ PRICE_OPTIONS }/>
            </div>
            <div className="cuisine-filter-container">
              <SearchFilter filterType="cuisines" choicesArray={ CUISINE_OPTIONS }/>
            </div>
            <li>Some filter</li>
            <li>Some other filter</li>
            <li>ANOTHA ONE</li>
          </ul>

          { this.displayErrors() }
          { this.displayRestaurants() }
        </div>
      </div>
    );
  }
}
