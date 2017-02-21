import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user.js'
import animalcolor from './animalcolor.js'
import animaltypes from './animaltypes.js'
import animaloptions from './animaloptions.js'
import currenttype from './currenttype.js'
import currentoption from './currentoption.js'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  animalcolor,
  animaltypes,
  currenttype,
  animaloptions,
  currentoption
});

export default rootReducer;
