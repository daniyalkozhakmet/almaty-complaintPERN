import {
  ADD_REQUEST_COMPLAINT,
  ADD_SUCCESS_COMPLAINT,
  ADD_FAIL_COMPLAINT,
  GET_REQUEST_MY_COMPLAINTS,
  GET_SUCCESS_MY_COMPLAINTS,
  GET_FAIL_MY_COMPLAINTS,
  DELETE_REQUEST_MY_COMPLAINT,
  DELETE_SUCCESS_MY_COMPLAINT,
  DELETE_FAIL_MY_COMPLAINT,
  GET_REQUEST_MY_COMPLAINT_BY_ID,
  GET_SUCCESS_MY_COMPLAINT_BY_ID,
  GET_FAIL_MY_COMPLAINT_BY_ID,
  CLEAR_ADD_FAIL_COMPLAINT,
  UPDATE_REQUEST_MY_COMPLAINT,
  UPDATE_SUCCESS_MY_COMPLAINT,
  UPDATE_FAIL_MY_COMPLAINT,
} from "../types/complaint";
export const addComplaintReducer = (state = { complaint: null }, action) => {
  switch (action.type) {
    case ADD_REQUEST_COMPLAINT:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ADD_FAIL_COMPLAINT:
      return {
        complaint: null,
      };
    case ADD_SUCCESS_COMPLAINT:
      return {
        loading: false,
        complaint: action.payload,
        success: true,
      };
    case ADD_FAIL_COMPLAINT:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getComplaintByIdReducer = (
  state = { complaint: null },
  action
) => {
  switch (action.type) {
    case GET_REQUEST_MY_COMPLAINT_BY_ID:
    case UPDATE_REQUEST_MY_COMPLAINT:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUCCESS_MY_COMPLAINT:
      return {
        loading: false,
        complaint: state.complaint.map((c) =>
          c.id == action.payload.id ? action.payload : c
        ),
      };
    case GET_SUCCESS_MY_COMPLAINT_BY_ID:
      return {
        loading: false,
        complaint: action.payload,
      };
    case GET_FAIL_MY_COMPLAINT_BY_ID:
    case UPDATE_FAIL_MY_COMPLAINT:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getComplaintsReducer = (state = { complaints: null }, action) => {
  switch (action.type) {
    case GET_REQUEST_MY_COMPLAINTS:
    case DELETE_REQUEST_MY_COMPLAINT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SUCCESS_MY_COMPLAINT:
      return {
        loading: false,
        complaint: state.complaint.filter((c) => c.id != action.payload),
      };
    case GET_SUCCESS_MY_COMPLAINTS:
      return {
        loading: false,
        complaint: action.payload.complaints,
        page:action.payload.page,
        pages:action.payload.pages,
      };

    case GET_FAIL_MY_COMPLAINTS:
    case DELETE_FAIL_MY_COMPLAINT:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
