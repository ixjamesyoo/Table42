import * as RestaurantAPIUtil from "../util/restaurant_api_util";

export const RECEIVE_RESTAURANT = "RECEIVE_RESTAURANT";
export const RECEIVE_RESTAURANTS = "RECEIVE_RESTAURANTS";
export const RECEIVE_RESTAURANT_ERRORS = "RECEIVE_RESTAURANT_ERRORS";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS";
export const CLEAR_SEARCH_ERRORS = "CLEAR_SEARCH_ERRORS";

// WILL NEED:
// 1. UPDATE/DESTROY RESTAURANTS, removeRestaurant (from redux state)
// 2.POSSIBLY GET RID OF fetchRestaurants ( will always need to search by something right?)
// 3. UPDATE receiveRestaurant/receiveRestaurants, along with reducers once reviews, etc implemented
// will receive payload information instead of just restaurant

export const receiveRestaurant = (restaurant) => {
  return ({
    type: RECEIVE_RESTAURANT,
    restaurant
  });
};

export const receiveRestaurants = (restaurants) => {
  return ({
    type: RECEIVE_RESTAURANTS,
    restaurants
  });
};

// errors when creating a restaurant !
export const receiveRestaurantErrors = errors => {
  return  ({
    type: RECEIVE_RESTAURANT_ERRORS,
    errors
  });
};

// errors when searching
export const receiveSearchErrors = errors => {
  return  ({
    type: RECEIVE_SEARCH_ERRORS,
    errors
  });
};

export const clearSearchErrors = () => {
  return ({type: CLEAR_SEARCH_ERRORS,
  });
};

export const fetchRestaurant = id => dispatch => {
  return RestaurantAPIUtil.fetchRestaurant(id).then( restaurant => {
    dispatch(receiveRestaurant(restaurant));
  }, err => {
    dispatch(receiveSearchErrors(err.responseJSON));
  });
};

export const fetchRestaurants = () => dispatch => {
  return RestaurantAPIUtil.fetchRestaurants().then( restaurants => {
    dispatch(receiveRestaurants(restaurants));
  }, err => {
    dispatch(receiveSearchErrors(err.responseJSON));
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
  return RestaurantAPIUtil.searchRestaurants(query).then( restaurants => {
    dispatch(receiveRestaurants(restaurants));
  }, err => {
    dispatch(receiveSearchErrors(err.responseJSON));
  });
};
