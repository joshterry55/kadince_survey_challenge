const animaltypes = (state = {}, action) => {

  switch(action.type) {
    case 'ANIMAL_TYPES':
      return action.animals
    case 'ADD_ANIMAL_TYPE':
      return [...state, action.animal]
    default:
      return state;
  }
}

export default animaltypes;
