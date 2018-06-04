import merge from "lodash/merge";
import { RECEIVE_CURRENT_USER, RECEIVE_DETAILED_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
    case RECEIVE_DETAILED_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
