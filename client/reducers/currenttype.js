const currenttype = (state = {}, action) => {

  switch(action.type) {
    case 'CURRENT_TYPE':
      return action.animal
    default:
      return state;
  }
}

export default currenttype;
