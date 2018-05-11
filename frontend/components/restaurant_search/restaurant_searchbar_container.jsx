import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { receiveSearchErrors, clearSearchErrors } from "../../actions/restaurant_actions";
import SearchBar from "./restaurant_searchbar";

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.restaurant,
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.entities.users[state.session.currentUser]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    receiveSearchErrors: (errors) => dispatch(receiveSearchErrors(errors)),
    clearSearchErrors: () => dispatch(clearSearchErrors())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
