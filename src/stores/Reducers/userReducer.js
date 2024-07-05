import { stat } from "react-native-fs"
import { act } from "react-test-renderer"

const initialState = {
  users: null,
  userss: [],
  ConditionMAin:null
  

}

export const userReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case 'LOGIN_PROCESSED':
      return {
        ...state,
        users: payload
      }
   
      case 'Condition':
        return {
          ...state,
          ConditionMAin: payload
        }    
    default:
      return state
  }
}

export default userReducer
