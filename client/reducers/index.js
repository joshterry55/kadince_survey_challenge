import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user.js'
import animalcolor from './animalcolor.js'
import colorcolor from './colorcolor.js'
import animaltypes from './animaltypes.js'
import animaloptions from './animaloptions.js'
import currenttype from './currenttype.js'
import currentoption from './currentoption.js'
import currentcoloroption from './currentcoloroption.js'
import coloroptions from './coloroptions.js'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  animalcolor,
  animaltypes,
  currenttype,
  animaloptions,
  currentoption,
  colorcolor,
  coloroptions,
  currentcoloroption
});

export default rootReducer;
