import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import HomeInfo from './common/HomeInfo';
import { getOptions, getMeal, getTimeTable } from '../modules/homeState';

const HomeContainer = ({
  getOptions,
  getMeal,
  getTimeTable,
  options,
  info,
}) => {
  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <HomeInfo
      options={options}
      info={info}
      getMeal={getMeal}
      getTimeTable={getTimeTable}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.homeState.loading,
    options: state.homeState.options,
    info: state.homeState.info,
  };
};

export default connect(mapStateToProps, { getOptions, getMeal, getTimeTable })(
  HomeContainer,
);
