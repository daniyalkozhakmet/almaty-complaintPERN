import axios from "axios";
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
  UPDATE_REQUEST_ADMIN_USER,
  UPDATE_SUCCESS_ADMIN_USER,
  UPDATE_FAIL_ADMIN_USER,
  GET_REQUEST_ADMIN_COMPLAINTS,
  GET_SUCCESS_ADMIN_COMPLAINTS,
  GET_FAIL_ADMIN_COMPLAINTS,
  GET_REQUEST_ADMIN_COMPLAINT_BY_ID,
  GET_SUCCESS_ADMIN_COMPLAINT_BY_ID,
  GET_FAIL_ADMIN_COMPLAINT_BY_ID,
  UPDATE_RESPONSE_REQUEST_ADMIN,
  UPDATE_RESPONSE_SUCCESS_ADMIN,
  UPDATE_RESPONSE_FAIL_ADMIN,
} from "../types/admin";
export const getUsersAdmin = (page=1) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_ADMIN_USERS });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/user/admin/profiles?page=${page}`, config);
    dispatch({ type: GET_SUCCESS_ADMIN_USERS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_ADMIN_USERS,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};
export const getUserAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_ADMIN_USER });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/user/admin/profile/${id}`, config);
    dispatch({ type: GET_SUCCESS_ADMIN_USER, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_ADMIN_USER,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const updateUserAdmin = (id, form) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_REQUEST_ADMIN_USER });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/user/admin/profile/update/${id}`,
      form,
      config
    );
    dispatch({ type: UPDATE_SUCCESS_ADMIN_USER, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL_ADMIN_USER,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};
export const deleteUsersAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_REQUEST_ADMIN_USER });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/user/admin/profile/delete/${id}`,
      config
    );

    dispatch({ type: DELETE_SUCCESS_ADMIN_USER, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_FAIL_ADMIN_USER,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};
export const getComplaintsAdmin = (page=1) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_ADMIN_COMPLAINTS });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/complaint/get/admin?page=${page}`, config);
    dispatch({ type: GET_SUCCESS_ADMIN_COMPLAINTS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_ADMIN_COMPLAINTS,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const getComplaintByIdAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_ADMIN_COMPLAINT_BY_ID });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/complaint/get/admin/${id}`, config);
    dispatch({ type: GET_SUCCESS_ADMIN_COMPLAINT_BY_ID, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_ADMIN_COMPLAINT_BY_ID,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const updateResponseComplaintAdmin =
  (id, form) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_RESPONSE_REQUEST_ADMIN });
      const {
        user: { token },
      } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `/api/complaint/update/admin/${id}`,
        form,
        config
      );
      dispatch({ type: UPDATE_RESPONSE_SUCCESS_ADMIN, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_RESPONSE_FAIL_ADMIN,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      });
    }
  };
