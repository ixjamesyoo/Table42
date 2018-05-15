import {
  RECEIVE_RESERVATION_CONFIRMATION,
  CLEAR_RESERVATION_CONFIRMATION
} from "../actions/reservation_actions";

const _noConfirmation = Object.freeze({
  confirmation: false
});

export default (state = _noConfirmation, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESERVATION_CONFIRMATION:
      return { confirmation: true };
    case CLEAR_RESERVATION_CONFIRMATION:
      return _noConfirmation;
    default:
      return state;
  }
};
