const colorcolor = (state = {}, action) => {

  switch(action.type) {
    case 'COLOR_COLOR':
      return action.color
    default:
      return state;
  }
}

export default colorcolor;
