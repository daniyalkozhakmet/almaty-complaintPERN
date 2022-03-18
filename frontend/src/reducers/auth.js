import {
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAIL,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAIL,
  LOGOUT_SUCCESS
} from "../types/auth";
export const loginReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case GET_LOGIN_REQUEST:
    case GET_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LOGIN_SUCCESS:
    case GET_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case GET_LOGIN_FAIL:
    case GET_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return{
        loading:false,
        user:null
      }
    default:
      return state;
  }
};
