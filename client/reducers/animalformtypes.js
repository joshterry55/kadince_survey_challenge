const animalformtypes = (state = {}, action) => {

  switch(action.type) {
    case 'ANIMAL_FORM_TYPES':
      return action.animals
    default:
      return state;
  }
}

export default animalformtypes;
