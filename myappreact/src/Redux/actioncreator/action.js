import {LOGIN_SUCCESS, LOGOUT_SUCCESS ,GET_USER} from "./type";
export const getLogin = () => {
  return({
    type: LOGIN_SUCCESS
  })
}
export const getLogout = () => {
  return({
    type: LOGOUT_SUCCESS
  })
}


export const getUser = (user)=>{
  return({
    type: GET_USER,
    payload:user

  })
}