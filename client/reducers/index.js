import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user.js'

const rootReducer = combineReducers({
  routing: routerReducer,
  user
});

export default rootReducer;
