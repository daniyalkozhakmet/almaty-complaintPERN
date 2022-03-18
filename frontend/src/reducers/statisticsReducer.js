import {
  GET_COMPLAINT_STATISTICS_REQUEST,
  GET_COMPLAINT_STATISTICS_SUCCESS,
  GET_COMPLAINT_STATISTICS_FAIL,
} from "../types/admin";
export const complaintStatistics = (state = {}, action) => {
  switch ((action.type)) {
    case GET_COMPLAINT_STATISTICS_REQUEST:
      return {
        loading: false,
      };
    case GET_COMPLAINT_STATISTICS_SUCCESS:
      return {
        loading: false,
        statistics: action.payload,
      };
    case GET_COMPLAINT_STATISTICS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
