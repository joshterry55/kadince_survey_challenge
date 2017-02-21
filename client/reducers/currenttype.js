const currenttype = (state = {}, action) => {

  switch(action.type) {
    case 'CURRENT_TYPE':
      return action.animal
    case 'ADD_ANIMAL_TYPE':
      return [...state, action.animal]
    default:
      return state;
  }
}

export default currenttype;
