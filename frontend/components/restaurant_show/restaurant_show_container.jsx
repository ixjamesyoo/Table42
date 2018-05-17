import React from "react";
import { connect } from "react-redux";
import { fetchRestaurant } from '../../actions/restaurant_actions';
import { openModal } from "../../actions/modal_actions";
import { clearReviewConfirmation } from "../../actions/review_actions";
import RestaurantShow from "./restaurant_show";

const mapStateToProps = (state, { match }) => {
  return ({
    restaurant: state.entities.restaurants[match.params.id],
    errors: state.errors.restaurant,
    loading: state.ui.loading.showLoading,
    loggedIn: Boolean(state.session.currentUser),
    reviewConfirmation: state.ui.review.confirmation,
  });
};

const mapDispatchToProps = (dispatch, { match }) => {
  return ({
    fetchRestaurant: () => dispatch(fetchRestaurant(match.params.id)),
    openCreateReview: () => dispatch(openModal("create review")),
    openLogin: () => dispatch(openModal("login")),
    clearReviewConfirmation: () => dispatch(clearReviewConfirmation()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
