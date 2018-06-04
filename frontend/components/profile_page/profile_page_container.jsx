import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchUserProfile } from "../../actions/session_actions";
import { deleteReservation } from "../../actions/reservation_actions";
import ProfilePage from "./profile_page";

const mapStateToProps = ({ entities, session, ui }, ownProps) => {
  return {
    userId: session.currentUser,
    currentUser: entities.users[session.currentUser],
    restaurants: entities.restaurants,
    reservations: entities.reservations,
    reviews: entities.reviews,
    favorites: entities.favorites,
    loading: ui.loading.profileLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserProfile: (id) => dispatch(fetchUserProfile(id)),
    deleteReservation: (id) => dispatch(deleteReservation(id)),
    editReview: (id) => dispatch(openModal("edit review", id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
