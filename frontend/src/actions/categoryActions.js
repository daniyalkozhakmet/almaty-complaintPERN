import {
  GET_REQUEST_CATEGORY,
  GET_SUCCESS_CATEGORY,
  GET_FAIL_CATEGORY,
  DELETE_REQUEST_CATEGORY,
  DELETE_SUCCESS_CATEGORY,
  DELETE_FAIL_CATEGORY,
  DELETE_REQUEST_SUB_CATEGORY,
  DELETE_SUCCESS_SUB_CATEGORY,
  DELETE_FAIL_SUB_CATEGORY,
  ADD_REQUEST_CATEGORY,
  ADD_SUCCESS_CATEGORY,
  ADD_FAIL_CATEGORY,
  ADD_REQUEST_SUB_CATEGORY,
  ADD_SUCCESS_SUB_CATEGORY,
  ADD_FAIL_SUB_CATEGORY,
} from "../types/category";
import axios from "axios";
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REQUEST_CATEGORY });
    const { data } = await axios.get("/api/category");
    dispatch({ type: GET_SUCCESS_CATEGORY, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_CATEGORY,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};


export const addCategory = (form) => async (dispatch,getState) => {
  try {
    dispatch({ type: ADD_REQUEST_CATEGORY });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const {data}=await axios.post(`/api/category/add`,form,config);
    dispatch({ type: ADD_SUCCESS_CATEGORY, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_FAIL_CATEGORY,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};


export const addSubCategory = (form) => async (dispatch,getState) => {
  try {
    dispatch({ type: ADD_REQUEST_SUB_CATEGORY });
    const {
      user: { token },
    } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const {data}=await axios.post(`/api/category/sub/add`,form,config);
    dispatch({ type: ADD_SUCCESS_SUB_CATEGORY, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_FAIL_SUB_CATEGORY,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: DELETE_REQUEST_CATEGORY });
      const {
        user: { token },
      } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/category/delete/${id}`,config);
      dispatch({ type: DELETE_SUCCESS_CATEGORY, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_FAIL_CATEGORY,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      });
    }
  };

  export const deleteSubCategory = (c_id,s_id) => async (dispatch,getState) => {
    try {
      dispatch({ type: DELETE_REQUEST_SUB_CATEGORY });
      const {
        user: { token },
      } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const {data}=await axios.delete(`/api/category/sub/delete/${c_id}/${s_id}`,config);
      dispatch({ type: DELETE_SUCCESS_SUB_CATEGORY, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_FAIL_SUB_CATEGORY,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      });
    }
  };
