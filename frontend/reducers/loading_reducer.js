import {
  RECEIVE_RESTAURANT,
  RECEIVE_RESTAURANT_ERRORS,
  RECEIVE_RESTAURANTS,
  RECEIVE_SEARCH_ERRORS,
  LOADING_RESTAURANT,
  LOADING_RESTAURANTS
} from "../actions/restaurant_actions";
import { LOADING_PROFILE, RECEIVE_DETAILED_USER } from "../actions/session_actions";
import { merge } from "lodash";


const initialState = {
  indexLoading: false,
  showLoading: false,
  profileLoading: false
};

export default (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case LOADING_RESTAURANT:
      return merge({}, state, { showLoading: true });
    case LOADING_RESTAURANTS:
      return merge({}, state, { indexLoading: true });
    case RECEIVE_RESTAURANT:
    case RECEIVE_RESTAURANT_ERRORS:
      return merge({}, state, { showLoading: false });
    case RECEIVE_RESTAURANTS:
    case RECEIVE_SEARCH_ERRORS:
      return merge({}, state, { indexLoading: false});
    case LOADING_PROFILE:
      return merge({}, state, { profileLoading: true });
    case RECEIVE_DETAILED_USER:
      return merge({}, state, { profileLoading: false});
    default:
      return state;
  }
};
