import { ResultWithContext } from "express-validator/src/chain";
import {
  GET_REQUEST_PROFILE,
  GET_SUCCESS_PROFILE,
  GET_FAIL_PROFILE,
  UPDATE_REQUEST_PROFILE,
  UPDATE_SUCCESS_PROFILE,
  UPDATE_FAIL_PROFILE,
} from "../types/profile";
import { LOGOUT_SUCCESS } from "../types/auth";
export const getProfileReducer = (state = { profile: null }, action) => {
  switch (action.type) {
    case GET_REQUEST_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_SUCCESS_PROFILE:
      return {
        loading: false,
        profile: action.payload,
      };

    case GET_FAIL_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        profile: null,
      };
    default:
      return state;
  }
};
export const updateProfileReducer = (state = { profile: null }, action) => {
  switch (action.type) {
    case UPDATE_REQUEST_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUCCESS_PROFILE:
      return {
        loading: false,
        profile: action.payload,
        success: true,
      };
    case UPDATE_FAIL_PROFILE:
      return {
        loading: false,
        profile: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
