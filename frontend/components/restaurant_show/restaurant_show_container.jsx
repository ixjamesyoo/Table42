import React from "react";
import { connect } from "react-redux";
import { fetchRestaurant } from '../../actions/restaurant_actions';
import RestaurantShow from "./restaurant_show";

const mapStateToProps = (state, { match }) => {
  return ({
    restaurant: state.entities.restaurants[match.params.id]
  });
};

const mapDispatchToProps = (dispatch, { match }) => {
  return ({
    fetchRestaurant: () => dispatch(fetchRestaurant(match.params.id))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
