const init = {
  user: [],
};
const reducer = (state = init, action) => {
  // console.log('action user', action)

  switch (action.type) {
    case 'UPDATE_USER': {
      // console.log('action user', action.user)
      return {
        ...state,
        user: action.user,
      };
    }

    case 'REMOVE_USER': {
      return { ...state, user: null };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
