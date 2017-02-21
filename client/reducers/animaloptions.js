const animaloptions = (state = {}, action) => {

  switch(action.type) {
    case 'ANIMAL_OPTIONS':
      return action.animals
    case 'ADD_ANIMAL_OPTION':
      return [...state, action.animal]
    case 'REMOVE_ANIMAL_OPTION':
    let index = state.findIndex( s => s.id === action.animal.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'UPDATE_ANIMAL_OPTION':
    let indexUpdate = state.findIndex( s => s.id === action.animal.id)
      return [
      ...state.slice(0, indexUpdate),
      ...state.slice(indexUpdate + 1),
      action.animal
      ]
    default:
      return state;
  }
}

export default animaloptions;
