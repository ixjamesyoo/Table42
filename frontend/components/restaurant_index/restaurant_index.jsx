import React from "react";
import { Link } from "react-router-dom";
import { parseQuery } from "./restaurant_index_helper";

export default class RestaurantIndex extends React.Component {
  componentDidMount() {
    const queryString = this.props.location.search.slice(1);
    this.props.searchRestaurants(parseQuery(queryString));
  }

  componentWillReceiveProps(nextProps) {
    // check ui slice of state then conditionally send ajax request

    // if ()
  }

  render(){
    return null;
  }
}
