import axios from "axios";
import {
  GET_USER_STATISTICS_REQUEST,
  GET_USER_STATISTICS_SUCCESS,
  GET_USER_STATISTICS_FAIL,
  GET_COMPLAINT_STATISTICS_REQUEST,
  GET_COMPLAINT_STATISTICS_SUCCESS,
  GET_COMPLAINT_STATISTICS_FAIL,
} from "../types/admin";

export const getUserStatistics =
  (time = "month") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_USER_STATISTICS_REQUEST });
      const {
        user: { token },
      } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/api/user/admin/statistics?time=${time}`,
        config
      );
      dispatch({ type: GET_USER_STATISTICS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_USER_STATISTICS_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      });
    }
  };

export const getComplaintStatistics = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_COMPLAINT_STATISTICS_REQUEST });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/category/statistics`, config);
    dispatch({ type: GET_COMPLAINT_STATISTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COMPLAINT_STATISTICS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};
