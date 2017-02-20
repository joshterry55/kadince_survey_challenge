const animalcolor = (state = {}, action) => {

  switch(action.type) {
    case 'ANIMAL_COLOR':
      return action.color
    default:
      return state;
  }
}

export default animalcolor;
