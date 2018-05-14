import React from "react";
import { Link } from "react-router-dom";
import {
  parseQuery,
  parseHash,
  PRICE_OPTIONS,
  CUISINE_OPTIONS
} from "./restaurant_index_helper";
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
    const { restaurants, location, receiveSearchErrors, clearSearchErrors } = this.props;
    if (!restaurants.restaurantIds || this.props.errors.length) return null;

    let indexItems = [];
    if (location.hash) {
      const filterParams = parseHash(location.hash.slice(1));
      const restIds = restaurants.restaurantIds;

      for (let i = 0; i < restIds.length; i++) {
        const thisRest = restaurants[restIds[i]];
        let willRender = true;
        for (let j = 0; j < filterParams.length; j++) {
          const param = filterParams[j];
          const paramCategory = param[0];
          const paramChoices = param[1];

          if (Array.isArray(thisRest[paramCategory])) {
            willRender = thisRest[paramCategory].some(el => paramChoices.includes(el));
            if (!willRender) break;
          } else {
            willRender = paramChoices.includes(thisRest[paramCategory]);
            if (!willRender) break;
          }
        }
        if (!willRender) continue;
        indexItems.push((<RestaurantIndexItem key={ thisRest.id } restaurant={ thisRest } />));
      }

    } else {
      indexItems = restaurants.restaurantIds.map( id => (
        <RestaurantIndexItem key={ id } restaurant={ restaurants[id] } />
      ));
    }

    return indexItems.length ?
      (
        <div className="search-results-container">
          { indexItems }
        </div>
      ) : (
        <div className="search-error-container">
          <span className="search-error-text">No matching restaurants found.</span>
        </div>
      );
  }

  render(){
    return (
      <div className="main-page">
        <SearchBar />
        <div className="index-page-main">

          <ul className="filter-list">
            <div className="price-filter-container">
              <h3 className="filter-header">Price Range</h3>
              <SearchFilter filterType="price_range" choicesArray={ PRICE_OPTIONS }/>
            </div>
            <div className="cuisine-filter-container">
              <h3 className="filter-header">Cuisine</h3>
              <SearchFilter filterType="cuisines" choicesArray={ CUISINE_OPTIONS }/>
            </div>
          </ul>

          { this.displayErrors() }
          { this.displayRestaurants() }
        </div>
      </div>
    );
  }
}
