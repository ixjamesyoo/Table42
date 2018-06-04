import merge from "lodash/merge";
import { RECEIVE_REVIEW, REMOVE_REVIEW } from "../actions/review_actions";
import { RECEIVE_RESTAURANT } from "../actions/restaurant_actions";
import { RECEIVE_DETAILED_USER } from "../actions/session_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REVIEW:
      const newReviewIds = state.review_ids.includes(action.review.id) ?
        state.review_ids : state.review_ids.concat([action.review.id]);
      return merge({}, state, {
        [action.review.id]: action.review,
        review_ids: newReviewIds
      });
    case REMOVE_REVIEW:
      const newState = merge({}, state);
      delete newState[action.review.id];
      const copyIds = newState.review_ids.slice();
      const removedIdx = copyIds.indexOf(action.review.id);
      delete newState.review_ids;
      return merge(newState, {
        review_ids: copyIds.slice(0, removedIdx).concat(copyIds.slice(removedIdx+1))
      });
    case RECEIVE_RESTAURANT:
    case RECEIVE_DETAILED_USER:
      return action.reviews;
    default:
      return state;
  }
};
