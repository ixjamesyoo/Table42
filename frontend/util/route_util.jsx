import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import { openModal } from '../actions/modal_actions';
import ProtectedModal from "../components/modal/protected_modal";

// renders component if logged out, otherwise redirects to the root url
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

// renders component if logged in, otherwise opens modal?
const Protected = ({ component: Component, path, loggedIn, exact, openModal }) => (
  <Route path={path} exact={exact} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <ProtectedModal openModal={ openModal } />
    )
  )}
  />
);

// access the Redux state to check if the user is logged in
const mapStateToProps = state => {
  return { loggedIn: Boolean(state.session.currentUser) };
};

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(openModal("login"))
});

// connect Auth to the redux state
export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

// connect Protected to the redux state
export const ProtectedRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(Protected));
