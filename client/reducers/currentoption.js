const currentoption = (state = {}, action) => {

  switch(action.type) {
    case 'CURRENT_OPTION':
      return action.animal
    default:
      return state;
  }
}

export default currentoption;
