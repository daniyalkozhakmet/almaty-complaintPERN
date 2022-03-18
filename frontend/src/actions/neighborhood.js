import axios from 'axios'
import {
  GET_REQUEST_NEIGHBORHOOD,
  GET_SUCCESS_NEIGHBORHOOD,
  GET_FAIL_NEIGHBORHOOD,
  DELETE_REQUEST_NEIGHBORHOOD,
  DELETE_SUCCESS_NEIGHBORHOOD,
  DELETE_FAIL_NEIGHBORHOOD,
  ADD_REQUEST_NEIGHBORHOOD,
  ADD_SUCCESS_NEIGHBORHOOD,
  ADD_FAIL_NEIGHBORHOOD,
} from "../types/neighborhood";
export const getNeighborhoods = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REQUEST_NEIGHBORHOOD });
    const { data } = await axios.get("/api/neighborhood");
    dispatch({ type: GET_SUCCESS_NEIGHBORHOOD, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_NEIGHBORHOOD,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const deleteNeighborhood = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: DELETE_REQUEST_NEIGHBORHOOD });
      const {
        user: { token },
      } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/neighborhood/delete/${id}`,config);
      dispatch({ type: DELETE_SUCCESS_NEIGHBORHOOD, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_FAIL_NEIGHBORHOOD,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      });
    }
  };

  export const addNeighborhood = (form) => async (dispatch,getState) => {
    try {
      dispatch({ type: ADD_REQUEST_NEIGHBORHOOD });
      const {
        user: { token },
      } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const {data}=await axios.post(`/api/neighborhood/add`,form,config);
      dispatch({ type: ADD_SUCCESS_NEIGHBORHOOD, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_FAIL_NEIGHBORHOOD,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      });
    }
  };
  
