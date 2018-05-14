import React from "react";
import { connect } from "react-redux";
import RestaurantIndex from "./restaurant_index";
import {
  searchRestaurants,
  receiveSearchErrors,
  clearSearchErrors,
} from '../../actions/restaurant_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    errors: state.errors.restaurant,
    restaurants: state.entities.restaurants
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    searchRestaurants: (query) => dispatch(searchRestaurants(query)),
    receiveSearchErrors: () => dispatch(receiveSearchErrors(["No matching restaurants found."])),
    clearSearchErrors: () => dispatch(clearSearchErrors())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantIndex);
