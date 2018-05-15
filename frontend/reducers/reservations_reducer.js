import merge from "lodash/merge";
import { RECEIVE_RESERVATION, REMOVE_RESERVATION } from "../actions/restaurant_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESERVATION:
      return merge({}, state, { [action.reservation.id]: action.reservation });
    case REMOVE_RESERVATION:
      const newState = merge({}, state);
      delete newState[action.reservation.id];
      return newState;
    default:
      return state;
  }
};
