import {
  GET_ERR_LOGS_PROJECT_REQUEST,
  GET_ERR_LOGS_PROJECT_FAIL,
  GET_ERR_LOGS_PROJECT_SUCCESS,CLEAR_ERROR
} from "../constants/userConstants";

import API_BASE_URL from "../../config";
import axios from "axios";

// helper function to return the headers object
const getHeaders = (token) => ({
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
    "ngrok-skip-browser-warning": "any",
  },
});

export const findAllErrorLog =
  ({ search, skip, limit, projectId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ERR_LOGS_PROJECT_REQUEST });
      const token = localStorage.getItem("token");
      const config = getHeaders(token);
      const { data } = await axios.get(
        `${API_BASE_URL}/logs?skip=${skip || 0}&limit=${limit || 10}&search=${
          search || ""
        }&projectId=${projectId || " "}`,
        config
      );
      console.log(data.data.totalErrData);
      dispatch({
        type: GET_ERR_LOGS_PROJECT_SUCCESS,
        payload: data?.data?.data[0] || data?.data[0],
        pageNumber: data?.data?.pageNumber,
        resultPerPage: limit,
        errorCount: data?.data?.totalErrData || 0,
      });
    } catch (error) {
      dispatch({
        type: GET_ERR_LOGS_PROJECT_FAIL,
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