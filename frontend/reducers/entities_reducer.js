import { combineReducers } from 'redux';
import users from './users_reducer';
import restaurants from "./restaurants_reducer";

const entitiesReducer = combineReducers({
  users,
  restaurants,
});

export default entitiesReducer;
