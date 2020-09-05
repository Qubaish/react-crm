import { SET_CURRENT_USER, SET_TOKEN, SET_LOGIN_ERR } from '../actions/auth';

export default function authedUser(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {...state, user: action.user, isAuthenticated: true}
    case SET_TOKEN:
      return {...state, token: action.token}
    case SET_LOGIN_ERR: 
      return {...state, err: true, errMsg: action.err}
    default:
        return state
  }
}
