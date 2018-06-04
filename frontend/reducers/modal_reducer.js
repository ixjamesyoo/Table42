import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';
import merge from "lodash/merge";

const defaultState = {
  type: null,
  reviewId: null
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return merge({}, state, { type: action.modal, reviewId: action.reviewId });
    case CLOSE_MODAL:
      return defaultState;
    default:
      return state;
  }
};
