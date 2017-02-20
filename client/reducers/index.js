import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user.js'
import animalcolor from './animalcolor.js'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  animalcolor
});

export default rootReducer;
