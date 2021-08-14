import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';
import { getUserInfo, userLogout } from '../modules/headerState';

const HeaderContainer = ({ getUserInfo, userLogout, user }) => {
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return <Header user={user} logout={userLogout} />;
};

const mapStateToProps = (state) => {
  return {
    user: state.headerState.user,
    loading: state.headerState.loading,
  };
};

export default connect(mapStateToProps, {
  getUserInfo,
  userLogout,
})(HeaderContainer);
