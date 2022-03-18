import {
  GET_REQUEST_ADMIN_USERS,
  GET_SUCCESS_ADMIN_USERS,
  GET_FAIL_ADMIN_USERS,
  DELETE_REQUEST_ADMIN_USER,
  DELETE_SUCCESS_ADMIN_USER,
  DELETE_FAIL_ADMIN_USER,
  GET_FAIL_ADMIN_USER,
  GET_SUCCESS_ADMIN_USER,
  GET_REQUEST_ADMIN_USER,
  SET_ADMIN_USER,
  UPDATE_REQUEST_ADMIN_USER,
  UPDATE_SUCCESS_ADMIN_USER,
  UPDATE_FAIL_ADMIN_USER,
  GET_REQUEST_ADMIN_COMPLAINTS,
  GET_SUCCESS_ADMIN_COMPLAINTS,
  GET_FAIL_ADMIN_COMPLAINTS,
  GET_REQUEST_ADMIN_COMPLAINT_BY_ID,
  GET_SUCCESS_ADMIN_COMPLAINT_BY_ID,
  GET_FAIL_ADMIN_COMPLAINT_BY_ID,
  GET_RESET_ADMIN_COMPLAINT_BY_ID,
  UPDATE_RESPONSE_REQUEST_ADMIN,
  UPDATE_RESPONSE_SUCCESS_ADMIN,
  UPDATE_RESPONSE_FAIL_ADMIN,
  GET_USER_STATISTICS_REQUEST,
GET_USER_STATISTICS_SUCCESS,
GET_USER_STATISTICS_FAIL
} from "../types/admin";
export const getUsersAdminReducer = (state = { users: null }, action) => {
  switch (action.type) {
    case GET_REQUEST_ADMIN_USERS:
    case DELETE_REQUEST_ADMIN_USER:
    case UPDATE_REQUEST_ADMIN_USER:
      case GET_USER_STATISTICS_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_SUCCESS_ADMIN_USER:
      return {
        ...state,
        error:null,
        loading: false,
        users: state.users.map((c) =>
          c.id == action.payload.id ? action.payload : c
        ),
      };
    case DELETE_SUCCESS_ADMIN_USER:
      return {
        ...state,
        error:null,
        loading: false,
        users: state.users.filter((u) => u.id != action.payload),
      };
    case GET_SUCCESS_ADMIN_USERS:
      return {
        ...state,
        loading: false,
        error:null,
        users: action.payload.users,
        pages:action.payload.pages,
        page:action.payload.page
      };
    case GET_USER_STATISTICS_SUCCESS:
      return{
        ...state,
        error:null,
        loading:false,
        statistics:action.payload.data,
        time:action.payload.time
      }
    case GET_FAIL_ADMIN_USERS:
    case DELETE_FAIL_ADMIN_USER:
    case UPDATE_FAIL_ADMIN_USER:
      case GET_USER_STATISTICS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getUserAdminReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case GET_REQUEST_ADMIN_USER:
      return {
        loading: true,
      };
    case SET_ADMIN_USER:
      return {
        loading: false,
        user: null,
      };
    case GET_SUCCESS_ADMIN_USER:
      return {
        loading: false,
        user: action.payload,
      };
    case GET_FAIL_ADMIN_USER:
      return {
        loading: false,
        error: action.patload,
      };
    default:
      return state;
  }
};
export const getComplaintsAdminReducer = (
  state = { complaints: null },
  action
) => {
  switch (action.type) {
    case GET_REQUEST_ADMIN_COMPLAINTS:
      return {
        loading: true,
      };
    case GET_SUCCESS_ADMIN_COMPLAINTS:
      return {
        complaints: action.payload.complaints,
        page:action.payload.page,
        pages:action.payload.pages,
        loading: false,
      };
    case GET_FAIL_ADMIN_COMPLAINTS:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getComplaintByIdAdminReducer = (
  state = { complaint: null },
  action
) => {
  switch (action.type) {
    case GET_REQUEST_ADMIN_COMPLAINT_BY_ID:
    case UPDATE_RESPONSE_REQUEST_ADMIN:
      return {
        loading: true,
      };
    case UPDATE_RESPONSE_SUCCESS_ADMIN:
      return {
        loading: false,
        complaint: action.patload,
      };
    case GET_SUCCESS_ADMIN_COMPLAINT_BY_ID:
      return {
        loading: false,
        complaint: action.payload,
      };
    case GET_FAIL_ADMIN_COMPLAINT_BY_ID:
    case UPDATE_RESPONSE_FAIL_ADMIN:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_RESET_ADMIN_COMPLAINT_BY_ID:
      return {
        complaint: null,
      };
    default:
      return state;
  }
};
