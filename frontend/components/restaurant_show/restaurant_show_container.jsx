import React from "react";
import { connect } from "react-redux";
import { fetchRestaurant } from '../../actions/restaurant_actions';
import { fetchFavorites } from "../../actions/favorite_actions";
import RestaurantShow from "./restaurant_show";

const mapStateToProps = ({ entities, errors, session, ui }, { match }) => {
  return ({
    restaurant: entities.restaurants[match.params.id],
    errors: errors.restaurant,
    loading: ui.loading.showLoading,
    currentUser: session.currentUser
  });
};
// reviewConfirmation: ui.review.confirmation,

const mapDispatchToProps = (dispatch, { match }) => {
  return ({
    fetchRestaurant: () => dispatch(fetchRestaurant(match.params.id)),
    fetchFavorites: (userId) => dispatch(fetchFavorites(userId))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
