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

  render(){
    return (
      <SearchBar />
    );
  }
}
