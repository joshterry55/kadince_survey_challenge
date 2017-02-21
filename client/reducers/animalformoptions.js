const animalformoptions = (state = {}, action) => {

  switch(action.type) {
    case 'ANIMAL_FORM_OPTIONS':
      return action.animals
    default:
      return state;
  }
}

export default animalformoptions;
