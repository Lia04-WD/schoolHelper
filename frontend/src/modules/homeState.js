import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

const GET_OPTIONS = 'homeState/GET_OPTIONS';
const GET_OPTIONS_SUCCESS = 'homeState/GET_OPTIONS_SUCCESS';
const GET_OPTIONS_FAILURE = 'homeState/GET_OPTIONS_FAILURE';

const GET_MEAL = 'homeState/GET_MEAL';
const GET_MEAL_SUCCESS = 'homeState/GET_MEAL_SUCCESS';
const GET_MEAL_FAILURE = 'homeState/GET_MEAL_FAILURE';

const GET_TIMETABLE = 'homeState/GET_TIMETABLE';
const GET_TIMETABLE_SUCCESS = 'homeState/GET_TIMETABLE_SUCCESS';
const GET_TIMETABLE_FAILURE = 'homeState/GET_TIMETABLE_FAILURE';

export const getOptions = () => async (dispatch) => {
  dispatch({ type: GET_OPTIONS });
  try {
    const response = await api.getOptions();
    dispatch({
      type: GET_OPTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_OPTIONS_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

export const getMeal = (schoolName) => {
  return async (dispatch) => {
    dispatch({ type: GET_MEAL });
    try {
      const response = await api.getMeal(schoolName);
      dispatch({
        type: GET_MEAL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_MEAL_FAILURE,
        payload: error,
        error: true,
      });
      throw error;
    }
  };
};

export const getTimeTable = (schoolOptions) => {
  return async (dispatch) => {
    dispatch({ type: GET_TIMETABLE });
    try {
      const response = await api.getTimeTable(schoolOptions);
      dispatch({
        type: GET_TIMETABLE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TIMETABLE_FAILURE,
        payload: error,
        error: true,
      });
      throw error;
    }
  };
};

const initialState = {
  loading: {
    isProcess: false,
  },
  options: null,
  info: {
    meal: null,
    timeTable: null,
  },
};

const homeState = handleActions(
  {
    [GET_OPTIONS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: true,
      },
    }),
    [GET_OPTIONS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: false,
      },
      options: action.payload,
    }),
    [GET_OPTIONS_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: false,
      },
    }),
    [GET_MEAL]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: true,
      },
    }),
    [GET_MEAL_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: false,
      },
      info: {
        ...state.info,
        meal: action.payload,
      },
    }),
    [GET_MEAL_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: false,
      },
    }),
    [GET_TIMETABLE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: true,
      },
    }),
    [GET_TIMETABLE_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: false,
      },
      info: {
        ...state.info,
        timeTable: action.payload,
      },
    }),
    [GET_TIMETABLE_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcess: false,
      },
    }),
  },
  initialState,
);

export default homeState;
