import React from 'react';
import { connect } from 'react-redux';
import Login from '../pages/Login';
import { kakaoLogin, naverLogin, googleLogin } from '../modules/loginState';

const LoginContainer = ({ kakaoLogin, naverLogin, googleLogin }) => {
  return <Login kakao={kakaoLogin} naver={naverLogin} google={googleLogin} />;
};

const mapStateToProps = (state) => {
  return {
    loading: state.loginState.loading,
  };
};

export default connect(mapStateToProps, {
  kakaoLogin,
  naverLogin,
  googleLogin,
})(LoginContainer);
