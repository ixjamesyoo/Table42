import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import restaurant from "./restaurant_errors_reducer";

const errorsReducer = combineReducers({
  session,
  restaurant
});

export default errorsReducer;
