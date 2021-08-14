import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

const USER_STATE = 'headerState/USER_STATE';
const USER_STATE_SUCCESS = 'headerState/USER_STATE_SUCCESS';
const USER_STATE_FAILURE = 'headerState/USER_STATE_FAILURE';

const USER_LOGOUT = 'headerState/USER_LOGOUT';
const USER_LOGOUT_SUCCESS = 'headerState/USER_LOGOUT_SUCCESS';
const USER_LOGOUT_FAILURE = 'headerState/USER_LOGOUT_FAILURE';

export const getUserInfo = () => async (dispatch) => {
  dispatch({ type: USER_STATE });
  try {
    const response = await api.getUser();
    dispatch({
      type: USER_STATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_STATE_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  try {
    const response = await api.logout();
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

const initialState = {
  user: {
    nick: null,
    snsId: null,
    provider: null,
  },
  loading: {
    USER_STATE: false,
  },
};

const headerState = handleActions(
  {
    [USER_STATE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        USER_STATE: true,
      },
    }),
    [USER_STATE_SUCCESS]: (state, action) => ({
      ...state,
      user: action.payload,
      loading: {
        ...state.loading,
        USER_STATE: false,
      },
    }),
    [USER_STATE_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        USER_STATE: false,
      },
    }),
    [USER_LOGOUT]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        USER_STATE: true,
      },
    }),
    [USER_LOGOUT_SUCCESS]: (state, action) => ({
      ...state,
      user: action.payload,
      loading: {
        ...state.loading,
        USER_STATE: false,
      },
    }),
    [USER_LOGOUT_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        USER_STATE: false,
      },
    }),
  },
  initialState,
);

export default headerState;
