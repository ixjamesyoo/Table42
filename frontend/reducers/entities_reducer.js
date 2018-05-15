import { combineReducers } from 'redux';
import users from './users_reducer';
import restaurants from "./restaurants_reducer";
import reservations from "./reservations_reducer";

const entitiesReducer = combineReducers({
  users,
  restaurants,
  reservations,
});

export default entitiesReducer;
