import React from 'react';
import { connect } from 'react-redux';
import Options from '../pages/Options';

import {
  schoolNameChange,
  searchSchool,
  schoolSelect,
  changePersonalInfo,
  applyOption,
} from '../modules/optionsState';

const OptionsContainer = ({
  schoolNameChange,
  searchSchool,
  schoolList,
  schoolSelect,
  searchName,
  changePersonalInfo,
  submitSchool,
  gradeAndclass,
  applyOption,
  isSuccess,
}) => {
  return (
    <Options
      scnChange={schoolNameChange}
      searchSchool={searchSchool}
      schoolList={schoolList}
      schoolSelect={schoolSelect}
      searchName={searchName}
      changePersonalInfo={changePersonalInfo}
      submitSchool={submitSchool}
      gradeAndclass={gradeAndclass}
      applyOption={applyOption}
      isSuccess={isSuccess}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.optionsState.loading,
    submitForm: state.optionsState.submitFom,
    schoolList: state.optionsState.schoolList,
    searchName: state.optionsState.searchName,
    submitSchool: state.optionsState.submitForm.schoolInfo,
    gradeAndclass: state.optionsState.GradeAndClass,
    isSuccess: state.optionsState.isSuccess,
  };
};

export default connect(mapStateToProps, {
  schoolNameChange,
  searchSchool,
  schoolSelect,
  changePersonalInfo,
  applyOption,
})(OptionsContainer);
