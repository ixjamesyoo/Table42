import React from "react";
import { connect } from "react-redux";
import { fetchRestaurant } from '../../actions/restaurant_actions';
import { openModal } from "../../actions/modal_actions";
import { clearReviewConfirmation } from "../../actions/review_actions";
import RestaurantShow from "./restaurant_show";

const mapStateToProps = ({ entities, errors, session, ui }, { match }) => {
  return ({
    restaurant: entities.restaurants[match.params.id],
    errors: errors.restaurant,
    loading: ui.loading.showLoading,
  });
};
// loggedIn: Boolean(session.currentUser),
// reviewConfirmation: ui.review.confirmation,

const mapDispatchToProps = (dispatch, { match }) => {
  return ({
    fetchRestaurant: () => dispatch(fetchRestaurant(match.params.id)),
  });
};
// openLogin: () => dispatch(openModal("login")),
// clearReviewConfirmation: () => dispatch(clearReviewConfirmation()),

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
