import { combineReducers } from 'redux';
import loginState from './loginState';
import headerState from './headerState';
import optionsState from './optionsState';
import homeState from './homeState';

const rootReducer = combineReducers({
  loginState,
  headerState,
  optionsState,
  homeState,
});

export default rootReducer;
