import * as RestaurantAPIUtil from "../util/restaurant_api_util";

export const RECEIVE_RESTAURANT = "RECEIVE_RESTAURANT";
export const RECEIVE_RESTAURANTS = "RECEIVE_RESTAURANTS";
export const RECEIVE_RESTAURANT_ERRORS = "RECEIVE_RESTAURANT_ERRORS";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS";
export const CLEAR_SEARCH_ERRORS = "CLEAR_SEARCH_ERRORS";
export const LOADING_RESTAURANT = "LOADING_RESTAURANT";
export const LOADING_RESTAURANTS = "LOADING_RESTAURANTS";

export const loadingRestaurant = () => ({
  type: LOADING_RESTAURANT
});

export const loadingRestaurants = () => ({
  type: LOADING_RESTAURANTS
});

export const receiveRestaurant = ({ restaurant, reviews }) => {
  return ({
    type: RECEIVE_RESTAURANT,
    restaurant,
    reviews
  });
};

export const receiveRestaurants = (restaurants) => {
  return ({
    type: RECEIVE_RESTAURANTS,
    restaurants
  });
};

export const receiveRestaurantErrors = errors => {
  return  ({
    type: RECEIVE_RESTAURANT_ERRORS,
    errors
  });
};

export const receiveSearchErrors = errors => {
  return  ({
    type: RECEIVE_SEARCH_ERRORS,
    errors
  });
};

export const clearSearchErrors = () => {
  return ({
    type: CLEAR_SEARCH_ERRORS,
  });
};

export const fetchRestaurant = id => dispatch => {
  dispatch(loadingRestaurant());
  return RestaurantAPIUtil.fetchRestaurant(id).then( payload => {
    dispatch(receiveRestaurant(payload));
  }, err => {
    dispatch(receiveRestaurantErrors(err.responseJSON));
  });
};

export const createRestaurant = restaurant => dispatch => {
  return RestaurantAPIUtil.createRestaurant(restaurant).then( newRestaurant => {
    dispatch(receiveRestaurant(newRestaurant));
  }, err => {
    dispatch(receiveRestaurantErrors(err.responseJSON));
  });
};

export const searchRestaurants = query => dispatch => {
  dispatch(loadingRestaurants());
  return RestaurantAPIUtil.searchRestaurants(query).then( restaurants => {
    dispatch(receiveRestaurants(restaurants));
  }, err => {
    dispatch(receiveSearchErrors(err.responseJSON));
  });
};
