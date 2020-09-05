import jwt_decode from 'jwt-decode';

import { login } from '../utils/api';
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_TOKEN = "SET_TOKEN";
export const SET_LOGIN_ERR = 'SET_LOGIN_ERR';
export const SESSION_EXPIRED = 'SESSION_EXPIRED';

export function signIn (user){
    return {
      type: SET_CURRENT_USER,
      user
    }
}

export function setLoginError(err) {
  return {
    type: SET_LOGIN_ERR,
    err
  }
}

export function setLogout(){
  return (dispatch) => {
    dispatch(signIn(null));
    localStorage.removeItem('jwtToken');
  }
}

export function handleSignIn (cred) {
    console.log(cred);
    return (dispatch) => {
    login(cred)
      .then((user) => {
        if( user && user.err) {
          dispatch(setLoginError(user.msg));
        } else {
          localStorage.setItem('jwtToken', user.token);
          const decoded = jwt_decode(user.token);
          dispatch(signIn(decoded))
        }
      })
      .catch(err => {
        dispatch(setLoginError(err));
      })
    }
}