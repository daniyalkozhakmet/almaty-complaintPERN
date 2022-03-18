import axios from "axios";
import {
  GET_REQUEST_PROFILE,
  GET_SUCCESS_PROFILE,
  GET_FAIL_PROFILE,
  UPDATE_REQUEST_PROFILE,
  UPDATE_SUCCESS_PROFILE,
  UPDATE_FAIL_PROFILE,
} from "../types/profile";
export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_PROFILE });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/user/profile", config);
    console.log(data)
    dispatch({ type: GET_SUCCESS_PROFILE, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_PROFILE,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};
//Update profile
export const updateProfile = (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_REQUEST_PROFILE });
      const {
        user: { token },
      } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put("/api/user/profile/update",formData, config);
      dispatch({ type: UPDATE_SUCCESS_PROFILE, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_FAIL_PROFILE,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      });
    }
  };
