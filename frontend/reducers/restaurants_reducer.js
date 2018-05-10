import merge from "lodash/merge";
import { RECEIVE_RESTAURANT, RECEIVE_RESTAURANTS } from "../actions/restaurant_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESTAURANT:
      return merge({}, state, { [action.restaurant.id]: action.restaurant });
    case RECEIVE_RESTAURANTS:
      return merge({}, state, action.restaurants);
    default:
      return state;
  }
};
