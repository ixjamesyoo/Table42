import merge from "lodash/merge";
import { RECEIVE_RESTAURANT, RECEIVE_RESTAURANTS } from "../actions/restaurant_actions";
import { RECEIVE_DETAILED_USER } from "../actions/session_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESTAURANT:
      return merge({}, state, { [action.restaurant.id]: action.restaurant });
    case RECEIVE_RESTAURANTS:
    case RECEIVE_DETAILED_USER:
      return action.restaurants;
    default:
      return state;
  }
};
