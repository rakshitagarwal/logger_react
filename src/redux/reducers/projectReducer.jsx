import {
  GET_All_PROJECT_REQUEST,
  GET_All_PROJECT_SUCCESS,
  GET_All_PROJECT_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_RESET,
  DELETE_PROJECT_FAIL,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_RESET,
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

export const findAllProjectsReducer = (
  state = {
    projects: [],
    projectsCount: "",
    resultPerPage: "",
    activePage: "",
  },
  action
) => {
  console.log(action, "///////////////");
  switch (action.type) {
    case GET_All_PROJECT_REQUEST:
      return {
        loading: true,
        projects: [],
        error: null,
      };

    case GET_All_PROJECT_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
        projectsCount: action.projectsCount,
        resultPerPage: action.resultPerPage,
        activePage: action.activePage,
        error: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case GET_All_PROJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PROJECT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROJECT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getProjectsReducer = (state = { projects: {} }, action) => {
  switch (action.type) {
    case GET_PROJECT_REQUEST:
      return {
        loading: true,
        projects: [],
        error: null,
      };

    case GET_PROJECT_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
        error: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case GET_PROJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// secret key
export const getProjectSecretKeyReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_SECRET_KEY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_SECRET_KEY_SUCCESS:
      return {
        loading: false,
        error: null,
        projectId: action.payload,
      };

    case PROJECT_SECRET_KEY_FAIL:
      return {
        loading: true,
        error: action.error,
      };

    default:
      return state;
  }
};

// textTag
export const textTagReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_TEXTTAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_TEXTTAG_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case PROJECT_TEXTTAG_FAIL:
      return {
        loading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
