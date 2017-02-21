const currentcoloroption = (state = {}, action) => {

  switch(action.type) {
    case 'CURRENT_COLOR_OPTION':
      return action.color
    default:
      return state;
  }
}

export default currentcoloroption;
