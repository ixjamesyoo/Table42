import {
  RECEIVE_RESTAURANT,
  RECEIVE_RESTAURANTS,
  RECEIVE_RESTAURANT_ERRORS,
  RECEIVE_SEARCH_ERRORS,
  CLEAR_SEARCH_ERRORS,
  LOADING_RESTAURANT,
  LOADING_RESTAURANTS
} from '../actions/restaurant_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_ERRORS:
    case RECEIVE_RESTAURANT_ERRORS:
      return action.errors;
    case RECEIVE_RESTAURANT:
    case RECEIVE_RESTAURANTS:
    case CLEAR_SEARCH_ERRORS:
    case LOADING_RESTAURANT:
    case LOADING_RESTAURANTS:
      return [];
    default:
      return state;
  }
};
