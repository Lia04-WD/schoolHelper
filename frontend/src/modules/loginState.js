import { handleActions } from 'redux-actions';

const KAKAO_LOGIN = 'loginState/KAKAO_LOGIN';
const KAKAO_LOGIN_SUCCESS = 'loginState/KAKAO_LOGIN_SUCCESS';
const KAKAO_LOGIN_FAILURE = 'loginState/KAKAO_LOGIN_FAILURE';

const NAVER_LOGIN = 'loginState/NAVER_LOGIN';
const NAVER_LOGIN_SUCCESS = 'loginState/NAVER_LOGIN_SUCCESS';
const NAVER_LOGIN_FAILURE = 'loginState/NAVER_LOGIN_FAILURE';

const GOOGLE_LOGIN = 'loginState/GOOGLE_LOGIN';
const GOOGLE_LOGIN_SUCCESS = 'loginState/GOOGLE_LOGIN_SUCCESS';
const GOOGLE_LOGIN_FAILURE = 'loginState/GOOGLE_LOGIN_FAILURE';

export const kakaoLogin = () => async (dispatch) => {
  dispatch({ type: KAKAO_LOGIN });
  try {
    console.log('로그인 실행중');
    dispatch({
      type: KAKAO_LOGIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: KAKAO_LOGIN_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

export const naverLogin = () => async (dispatch) => {
  dispatch({ type: NAVER_LOGIN });
  try {
    console.log('로그인 실행중');
    dispatch({
      type: NAVER_LOGIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: NAVER_LOGIN_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

export const googleLogin = () => async (dispatch) => {
  dispatch({ type: GOOGLE_LOGIN });
  try {
    console.log('로그인 실행중');
    dispatch({
      type: GOOGLE_LOGIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: GOOGLE_LOGIN_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  }
};

const initialState = {
  loading: {
    isProcessing: false,
  },
};

const loginState = handleActions(
  {
    [KAKAO_LOGIN]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: true,
      },
    }),
    [KAKAO_LOGIN_SUCCESS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: false,
      },
    }),
    [KAKAO_LOGIN_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: false,
      },
    }),
    [NAVER_LOGIN]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: true,
      },
    }),
    [NAVER_LOGIN_SUCCESS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: false,
      },
    }),
    [NAVER_LOGIN_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: false,
      },
    }),
    [GOOGLE_LOGIN]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: true,
      },
    }),
    [GOOGLE_LOGIN_SUCCESS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: false,
      },
    }),
    [GOOGLE_LOGIN_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProcessing: false,
      },
    }),
  },
  initialState,
);

export default loginState;
