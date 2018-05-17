import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";
import { clearReviewConfirmation } from "../../actions/review_actions";
import ReviewIndex from "./review_index";

const mapStateToProps = ({ entities, session, ui}, { match }) => {
  return ({
    restaurant: entities.restaurants[match.params.id],
    reviewIds: entities.restaurants[match.params.id].review_ids,
    currentUserId: session.currentUser, 
    loggedIn: Boolean(session.currentUser),
    reviewConfirmation: ui.review.confirmation,
  });
};

const mapDispatchToProps = (dispatch, { match }) => {
  return ({
    openCreateReview: () => dispatch(openModal("create review")),
    openLogin: () => dispatch(openModal("login")),
    clearReviewConfirmation: () => dispatch(clearReviewConfirmation()),
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewIndex));
