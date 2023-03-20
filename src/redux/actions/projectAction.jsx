import {
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  GET_All_PROJECT_REQUEST,
  GET_All_PROJECT_FAIL,
  GET_All_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  PROJECT_SECRET_KEY_REQUEST,
  PROJECT_SECRET_KEY_SUCCESS,
  PROJECT_SECRET_KEY_FAIL,
  PROJECT_TEXTTAG_REQUEST,
  PROJECT_TEXTTAG_SUCCESS,
  PROJECT_TEXTTAG_FAIL,
  CLEAR_ERROR,
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

// add project
export const addProject =
  (projectName, description, textTag) => async (dispatch) => {
    try {
      dispatch({ type: ADD_PROJECT_REQUEST });
      // const token = localStorage.getItem("token");
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //     "ngrok-skip-browser-warning": "any",
      //   },
      // };
      const token = localStorage.getItem("token");
      const config = getHeaders(token);

      const { data } = await axios.post(
        `${API_BASE_URL}/projects`,
        {
          projectName: projectName,
          description: description,
          textTag: textTag,
        },
        config
      );
      console.log(data);
      return dispatch({ type: ADD_PROJECT_SUCCESS, payload: data.message });
    } catch (error) {
      return dispatch({
        type: ADD_PROJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// get project
export const getProject = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECT_REQUEST });
    const token = localStorage.getItem("token");
    const config = getHeaders(token);
    const { data } = await axios.get(
      `${API_BASE_URL}/projects/${projectId}`,
      config
    );
    console.log(data);
    dispatch({ type: GET_PROJECT_SUCCESS, payload: data?.data });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//find All project

export const findAllproject =
  ({ search, skip, limit }) =>
  async (dispatch) => {
    try {
      console.log("+++++++++++++++++++++++++++");
      dispatch({ type: GET_All_PROJECT_REQUEST });

      const token = localStorage.getItem("token");
      const config = getHeaders(token);
      // const { data } = await axios.get(
      //   `${API_BASE_URL}/projects?=${payload?.skip || 0}&limit=${
      //     payload?.limit || 10
      //   }&search=${payload?.search || ""}`,
      //   config
      // );
      const { data } = await axios.get(
        `${API_BASE_URL}/projects?skip=${skip || 0}&limit=${
          limit || 10
        }&search=${search || ""}`,
        config
      );
      console.log(data.data.totalData, "-------------------------");
      dispatch({
        type: GET_All_PROJECT_SUCCESS,
        payload: data?.data?.data || data?.data,
        projectsCount: data?.data?.totalData || 0,
        resultPerPage: limit || 10,
        activePage: data?.data?.pageNumber || 0,
      });
    } catch (error) {
      dispatch({
        type: GET_All_PROJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// delete project
export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    const token = localStorage.getItem("token");
    const config = getHeaders(token);
    const { data } = await axios.delete(
      `${API_BASE_URL}/projects/${id}`,
      config
    );
    console.log(data);
    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProject =
  (projectId, { projectName, description, textTag }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROJECT_REQUEST });
      const token = localStorage.getItem("token");
      const config = getHeaders(token);

      const { data } = await axios.put(
        `${API_BASE_URL}/projects/${projectId}`,
        {
          projectName: projectName,
          description: description,
          textTag: textTag,
        },
        config
      );
      console.log(data);
      return dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PROJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// project secret key
export const projectSecretKey = (id) => async (dispatch) => {
  try {
    console.log(id, "=-=-=");
    dispatch({ type: PROJECT_SECRET_KEY_REQUEST });
    const token = localStorage.getItem("token");
    const config = getHeaders(token);
    const { data } = await axios.get(
      `${API_BASE_URL}/projects/project-secret/${id}`,
      config
    );
    console.log(data);
    dispatch({ type: PROJECT_SECRET_KEY_SUCCESS, payload: { data } });
  } catch (error) {
    dispatch({ 
      type: PROJECT_SECRET_KEY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// textTag
export const projectTextTag = () => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_TEXTTAG_REQUEST });
    const token = localStorage.getItem("token");
    const config = getHeaders(token);
    const { data } = await axios.get(`${API_BASE_URL}/tag`, config);
    console.log(data);
    dispatch({ type: PROJECT_TEXTTAG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROJECT_TEXTTAG_FAIL,
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
