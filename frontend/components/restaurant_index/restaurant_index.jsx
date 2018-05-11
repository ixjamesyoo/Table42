import React from "react";
import { Link } from "react-router-dom";

export default class RestaurantIndex extends React.Component {
  componentDidMount() {
    const queryString = this.props.location.search.slice(1);
    this.props.searchRestaurants(this.parseQuery(queryString));
  }

  // AFTER FIRST SPLIT MUST SPLIT AGAIN "="
  // parseQuery(query) {
  //   const queryPortions = query.split("&");
  //   queryPortions.map( portion => {
  //     if (portion[0] === "query"){
  //       return portion;
  //     } else {
  //       return []
  //     }
  //   });
  //
  // }

  render(){
    return null;
  }
}
