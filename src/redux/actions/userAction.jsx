import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERROR,
} from "../constants/userConstants";

import API_BASE_URL from "../../config";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post(
      `${API_BASE_URL}/user/login`,
      {
        email,
        password,
      },
      config
    );
    const token = data.data.token;
    localStorage.setItem("token", token);
    dispatch({ type: LOGIN_SUCCESS, payload: { data, token } });
    return { type: LOGIN_SUCCESS, payload: { data, token } };
  } catch (error) {
    return dispatch({
      type: LOGIN_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const tokenAction = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    return await dispatch({ type: LOGIN_SUCCESS, payload: { token } });
  }
};

// check login user
export const checkLoginUser = () => {
  const dispatch = async (dispatch) => {
    const token = localStorage.get("token");
    if (token) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { token },
      });
    } else {
      dispatch({ type: USER_LOGIN_FAIL, payload: { error: "Login first" } });
    }
  };
  return dispatch;
};

// logout
export const logout = () => async (dispatch) => {
  try {
  } catch (error) {}
};

// forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post(
      `${API_BASE_URL}/user/reset-mail`,
      { email: email },
      config
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    console.log(data);
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${API_BASE_URL}/user/reset-password`,
      { password: password },
      config
    );
    console.log(data);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// logout
export const logoutUser = (token) => async (dispatch) => {
  console.log(token);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "any",
      },
    };
    const { data } = await axios.post(
      `${API_BASE_URL}/user/logout`,
      {},
      config
    );
    dispatch({ type: LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
