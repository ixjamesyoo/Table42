import merge from "lodash/merge";
import { RECEIVE_REVIEW, REMOVE_REVIEW } from "../actions/review_actions";
import { RECEIVE_RESTAURANT } from "../actions/restaurant_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REVIEW:
      return merge({}, state, { [action.review.id]: action.review });
    case REMOVE_REVIEW:
      const newState = merge({}, state);
      delete newState[action.review.id];
      return newState;
    case RECEIVE_RESTAURANT:
      return merge({}, state, action.reviews);
    default:
      return state;


    // WHEN CREATING PROFILE PAGE NEED ACTION THAT WILL REPLACE STATE ENTIRELY WITH REVIEWS
  }
};
