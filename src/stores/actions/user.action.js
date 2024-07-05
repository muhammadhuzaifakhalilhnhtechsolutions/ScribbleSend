
export const LoginResponse = userss => {
  return async dispatch => {
    dispatch({ type: 'LOGIN', payload: userss })
  }
}
export const HandleMainScreen = Handle => {
  return async dispatch => {
    dispatch({ type: 'Condition', payload:Handle })
  }
}

