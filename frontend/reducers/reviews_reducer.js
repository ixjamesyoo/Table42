import merge from "lodash/merge";
import { RECEIVE_REVIEW, REMOVE_REVIEW } from "../actions/review_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REVIEW:
      return merge({}, state, { [action.review.id]: action.review });
    case REMOVE_REVIEW:
      const newState = merge({}, state);
      delete newState[action.review.id];
      return newState;
    default:
      return state;


    // WILL NEED ACTION THAT REPLACES REVIEWS SLICE OF STATE WHEN FETCHING RESTAURANT SHOW

    // WHEN CREATING PROFILE PAGE NEED ACTION THAT WILL REPLACE STATE ENTIRELY WITH REVIEWS
  }
};
