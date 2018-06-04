import merge from "lodash/merge";
import { RECEIVE_RESERVATION, REMOVE_RESERVATION } from "../actions/reservation_actions";
import { RECEIVE_DETAILED_USER } from "../actions/session_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESERVATION:
      return merge({}, state, { [action.reservation.id]: action.reservation });
    case REMOVE_RESERVATION:
      const newState = merge({}, state);
      delete newState[action.reservation.id];
      const copyIds = newState.reservation_ids.slice();
      const removedIdx = copyIds.indexOf(action.reservation.id);
      return merge(newState, {
        reservation_ids: copyIds.slice(0, removedIdx).concat(copyIds.slice(removedIdx+1))
      });
    case RECEIVE_DETAILED_USER:
      return action.reservations;
    default:
      return state;
  }
};
