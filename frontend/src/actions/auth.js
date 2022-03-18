import axios from 'axios'
import {
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAIL,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAIL,
  LOGOUT_SUCCESS
} from "../types/auth";
//login user
export const login=(formData)=>async dispatch=>{
    try {
        dispatch({type:GET_LOGIN_REQUEST})
        const config = {
            headers: {
              "Content-Type": "application/json"
            },
          };
        const {data}=await axios.post('/api/user/login',formData,config)
        localStorage.setItem("userLogin", JSON.stringify(data));
        dispatch({type:GET_LOGIN_SUCCESS,payload:data})
    } catch (error) {
      console.log(error.response.data.msg)
        dispatch({
            type: GET_LOGIN_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message,
          });
    }
}
//register user
export const register=(formData)=>async dispatch=>{
  try {
      dispatch({type:GET_REGISTER_REQUEST})
      const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
      const {data}=await axios.post('/api/user/register',formData,config)
      localStorage.setItem("userLogin", JSON.stringify(data));
      dispatch({type:GET_REGISTER_SUCCESS,payload:data})
  } catch (error) {
      dispatch({
          type: GET_REGISTER_FAIL,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : error.message,
        });
  }
}
//logout 
export const logout=()=>dispatch=>{
  localStorage.removeItem('userLogin')
  dispatch({type:LOGOUT_SUCCESS})
}