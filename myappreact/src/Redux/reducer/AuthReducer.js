import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actioncreator/type';


const initialState = {
  isAuthenticated: false,
  user: '',
  role: '',
};
// Reducers
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: localStorage.getItem('user'),
        role: localStorage.getItem('role')
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: localStorage.getItem('user'),
        role:''
      };
    default:
      return state;
  }
};
export default AuthReducer;