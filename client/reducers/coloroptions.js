const coloroptions = (state = {}, action) => {

  switch(action.type) {
    case 'COLOR_OPTIONS':
      return action.colors
    case 'ADD_COLOR_OPTION':
      return [...state, action.color]
    case 'REMOVE_COLOR_OPTION':
    let index = state.findIndex( s => s.id === action.color.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'UPDATE_COLOR_OPTION':
    let indexUpdate = state.findIndex( s => s.id === action.color.id)
      return [
      ...state.slice(0, indexUpdate),
      ...state.slice(indexUpdate + 1),
      action.color
      ]
    default:
      return state;
  }
}

export default coloroptions;
