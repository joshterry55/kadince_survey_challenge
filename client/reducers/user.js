const user = (state = {}, action) => {
  switch(action.type) {
    case 'USER':
      let { id, email } = action;
      return { id, email };
    default:
      return state;
  }
}

export default user;
