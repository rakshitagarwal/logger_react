import {
  GET_ERR_LOGS_PROJECT_REQUEST,
  GET_ERR_LOGS_PROJECT_SUCCESS,
  GET_ERR_LOGS_PROJECT_FAIL,
  CLEAR_ERROR
} from "../../redux/constants/userConstants";

export const findAllErrorLogsReducer = (state = { errorLogs: [],errorLogs:"",errorCount:"",resultPerPage:"",activePage:"" }, action) => {
    console.log(action)
    switch (action.type) {
      case GET_ERR_LOGS_PROJECT_REQUEST:
        return {
          loading: true,
          errorLogs: [],
          error: null,
        };
  
      case GET_ERR_LOGS_PROJECT_SUCCESS:
        return {
          loading: false,
          errorLogs: action.payload,
          errorCount: action.errorCount,
          resultPerPage: action.resultPerPage,
          activePage: action.pageNumber,
          error: null,
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      case GET_ERR_LOGS_PROJECT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };