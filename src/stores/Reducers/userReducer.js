const init = {
  user: [],
  teachers: [],
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
    case 'ALL_TEACHINGS': {
      // console.log('action user', action.user)
      return {
        ...state,
        teachers: action.res,
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
