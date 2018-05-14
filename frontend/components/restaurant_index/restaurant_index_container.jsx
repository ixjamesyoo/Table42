import React from "react";
import { connect } from "react-redux";
import RestaurantIndex from "./restaurant_index";
import { searchRestaurants, loadingRestaurants } from '../../actions/restaurant_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    errors: state.errors.restaurant,
    restaurants: state.entities.restaurants,
    loading: state.ui.loading.indexLoading
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    searchRestaurants: (query) => dispatch(searchRestaurants(query)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantIndex);
