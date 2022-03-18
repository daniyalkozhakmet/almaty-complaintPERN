import axios from 'axios'
import {
  ADD_REQUEST_COMPLAINT,
  ADD_FAIL_COMPLAINT,
  ADD_SUCCESS_COMPLAINT,
  GET_REQUEST_MY_COMPLAINTS,
  GET_SUCCESS_MY_COMPLAINTS,
  GET_FAIL_MY_COMPLAINTS,
  DELETE_REQUEST_MY_COMPLAINT,
  DELETE_SUCCESS_MY_COMPLAINT,
  DELETE_FAIL_MY_COMPLAINT,
  GET_REQUEST_MY_COMPLAINT_BY_ID,
  GET_SUCCESS_MY_COMPLAINT_BY_ID,
  GET_FAIL_MY_COMPLAINT_BY_ID,
  UPDATE_REQUEST_MY_COMPLAINT,
  UPDATE_SUCCESS_MY_COMPLAINT,
  UPDATE_FAIL_MY_COMPLAINT
} from "../types/complaint";

//POST complaint PRIVATE
export const addComplaint = (form) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_REQUEST_COMPLAINT });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`/api/complaint/add`, form, config);
    dispatch({ type: ADD_SUCCESS_COMPLAINT, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_FAIL_COMPLAINT,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};


//UPDATE complaint PRIVATE
export const updateComplaint = (id,form) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_REQUEST_MY_COMPLAINT });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/complaint/update/${id}`, form, config);
    dispatch({ type: UPDATE_SUCCESS_MY_COMPLAINT, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL_MY_COMPLAINT,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const getMyComplaints = (page=1) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_MY_COMPLAINTS });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/complaint/get?page=${page}`, config);
    dispatch({ type: GET_SUCCESS_MY_COMPLAINTS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_MY_COMPLAINTS,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

//GET complaints BY ID user
export const getMyComplaintById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_MY_COMPLAINT_BY_ID });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/complaint/get/${id}`, config);
    dispatch({ type: GET_SUCCESS_MY_COMPLAINT_BY_ID, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_MY_COMPLAINT_BY_ID,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

//delete complaint by id
export const deleteComplaintById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_REQUEST_MY_COMPLAINT });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/complaint/delete/${id}`, config);
    dispatch({ type: DELETE_SUCCESS_MY_COMPLAINT, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_FAIL_MY_COMPLAINT,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

