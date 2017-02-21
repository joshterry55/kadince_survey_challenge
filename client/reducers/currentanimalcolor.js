const currentanimalcolor = (state = {}, action) => {

  switch(action.type) {
    case 'CURRENT_ANIMAL_COLOR':
      return action.color
    default:
      return state;
  }
}

export default currentanimalcolor;
