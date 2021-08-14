import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

const SUBMIT_FORM = 'optionsState/SUBMIT_FORM';
const SUBMIT_FORM_SUCCESS = 'optionsState/SUBMIT_FORM_SUCCESS';
const SUBMIT_FORM_FAILURE = 'optionsState/SUBMIT_FORM_FAILURE';

const SEARCH_SCHOOL = 'optionsState/SEARCH_SCHOOL';
const SEARCH_SCHOOL_SUCCESS = 'optionsState/SEARCH_SCHOOL_SUCCESS';
const SEARCH_SCHOOL_FAILURE = 'optionsState/SEARCH_SCHOOL_FAILURE';

const CHANGE_INPUT = 'optionsState/CHANGE_INPUT';
const INITIALIZE_FORM = 'optionsState/INITIALIZE_FORM';

const SCHOOL_SELECT = 'optionsState/SCHOOL_SELECT';

const PERSONAL_CHANGE = 'optionsState/PERSONAL_CHANGE';

const OPTION_APPLY = 'optionsState/OPTION_APPLY';
const OPTION_APPLY_SUCCESS = 'optionsState/OPTION_APPLY_SUCCESS';
const OPTION_APPLY_FAILURE = 'optionState/OPTION_APPLY_FAILURE';

export const applyOption = (scInfo) => {
  return async (dispatch) => {
    dispatch({ type: OPTION_APPLY });
    try {
      const response = await api.optionRequest(scInfo);
      dispatch({ type: OPTION_APPLY_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: OPTION_APPLY_FAILURE,
        payload: error,
        error: true,
      });
      throw error;
    }
  };
};

export const submitForm = () => async (dispatch) => {
  dispatch({ type: SUBMIT_FORM });
};

export const searchSchool = (name) => {
  const schoolName = name;
  return async (dispatch) => {
    dispatch({ type: SEARCH_SCHOOL });
    try {
      const response = await api.searchSchool(schoolName);
      dispatch({ type: SEARCH_SCHOOL_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: SEARCH_SCHOOL_FAILURE,
        payload: error,
        error: true,
      });
      throw error;
    }
  };
};

export const schoolNameChange =
  ({ value }) =>
  (dispatch) => {
    dispatch({ type: CHANGE_INPUT, payload: { value } });
  };

export const schoolSelect =
  ({ school }) =>
  (dispatch) => {
    const selectedSchool = {
      schoolNameList: [
        {
          ATPT_OFCDC_SC_CODE: school.ATPT_OFCDC_SC_CODE,
          SD_SCHUL_CODE: school.SD_SCHUL_CODE,
          SCHUL_NM: school.SCHUL_NM,
          ORG_RDNMA: school.ORG_RDNMA,
          SCHUL_KND_SC_NM: school.SCHUL_KND_SC_NM,
          isSelected: true,
        },
      ],
    };
    dispatch({ type: SEARCH_SCHOOL_SUCCESS, payload: selectedSchool });
    dispatch({ type: SCHOOL_SELECT, payload: { ...school } });
  };

export const changePersonalInfo =
  ({ name, value }) =>
  (dispatch) => {
    dispatch({ type: PERSONAL_CHANGE, payload: { name, value } });
  };

const initialState = {
  loading: {
    isProccessing: false,
  },
  searchName: null,
  GradeAndClass: {
    grade: '',
    class: '',
  },
  submitForm: {
    schoolInfo: {
      ATPT_OFCDC_SC_CODE: null,
      SD_SCHUL_CODE: null,
      SCHUL_NM: null,
      ORG_RDNMA: null,
    },
  },
  schoolList: null,
  isSuccess: null,
};

const optionsState = handleActions(
  {
    [SUBMIT_FORM]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: true,
      },
    }),
    [SUBMIT_FORM_SUCCESS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: false,
      },
    }),
    [SUBMIT_FORM_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: false,
      },
    }),
    [SEARCH_SCHOOL]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: true,
      },
    }),
    [SEARCH_SCHOOL_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: false,
      },
      schoolList: action.payload,
    }),
    [SEARCH_SCHOOL_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: false,
      },
    }),
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      isSuccess: null,
      searchName: action.payload.value,
      submitForm: {
        ...state.submitForm,
        schoolInfo: {
          ...state.submitForm.schoolInfo,
          ATPT_OFCDC_SC_CODE: null,
          SD_SCHUL_CODE: null,
          SCHUL_NM: null,
          ORG_RDNMA: null,
        },
      },
      schoolList: null,
    }),
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      submitForm: {
        ...state.submitForm,
        schoolName: null,
      },
    }),
    [SCHOOL_SELECT]: (state, action) => ({
      ...state,
      submitForm: {
        ...state.submitForm,
        schoolInfo: action.payload,
      },
    }),
    [PERSONAL_CHANGE]: (state, action) => ({
      ...state,
      GradeAndClass: {
        ...state.GradeAndClass,
        [action.payload.name]: action.payload.value,
      },
    }),
    [OPTION_APPLY]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: true,
      },
    }),
    [OPTION_APPLY_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: false,
      },
      isSuccess: action.payload,
    }),
    [OPTION_APPLY_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isProccessing: false,
      },
    }),
  },
  initialState,
);

export default optionsState;
