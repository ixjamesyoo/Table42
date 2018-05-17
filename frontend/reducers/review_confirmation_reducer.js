import {
  RECEIVE_REVIEW_CONFIRMATION,
  CLEAR_REVIEW_CONFIRMATION
} from "../actions/review_actions";

const _noConfirmation = Object.freeze({
  confirmation: false
});

export default (state = _noConfirmation, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REVIEW_CONFIRMATION:
      return { confirmation: true };
    case CLEAR_REVIEW_CONFIRMATION:
      return _noConfirmation;
    default:
      return state;
  }
};
