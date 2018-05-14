import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SearchBar from "./restaurant_searchbar";

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.restaurant,
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.entities.users[state.session.currentUser]
  };
};

export default withRouter(connect(mapStateToProps)(SearchBar));
