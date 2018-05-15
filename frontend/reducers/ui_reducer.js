import { combineReducers } from 'redux';
import modal from './modal_reducer';
import loading from "./loading_reducer";
import reservation from "./reservation_confirmation_reducer";

const uiReducer = combineReducers({
  modal,
  loading,
  reservation,
});

export default uiReducer;
