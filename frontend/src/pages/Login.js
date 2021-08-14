import React from 'react';
import styled from 'styled-components';

import googleLogo from './pictures/google-logo.png';
import naverLogo from './pictures/naver-logo.png';
import kakaoLogo from './pictures/kakaotalk-logo.png';

import HeaderContainer from '../components/HeaderContainer';

const LogoDiv = styled.div`
  display: flex;
  padding-top: 200px;

  justify-content: center;
`;

const FlexLogo = styled.div`
  width: 150px;
  height: 150px;

  & img {
    width: 150px;
    height: 150px;
    border-radius: 50%;

    flex: 1;

    cursor: pointer;
  }
`;

const blankDiv = {
  display: 'flex',
  flex: 0.1,
};

const LoginHelp = styled.div`
  padding-top: 60px;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
`;

const Login = ({ kakao, naver, google }) => {
  return (
    <>
      <HeaderContainer />
      <LogoDiv>
        <FlexLogo>
          <a href="http://192.168.219.100:4000/auth/googleLogin">
            <img src={googleLogo} alt="google_logo" onClick={google} />
          </a>
        </FlexLogo>
        <div style={blankDiv} />
        <FlexLogo>
          <a href="http://192.168.219.100:4000/auth/naverLogin">
            <img src={naverLogo} alt="naver_logo" onClick={naver} />
          </a>
        </FlexLogo>
        <div style={blankDiv} />
        <FlexLogo>
          <a href="http://192.168.219.100:4000/auth/kakaoLogin">
            <img src={kakaoLogo} alt="kakao_logo" onClick={kakao} />
          </a>
        </FlexLogo>
      </LogoDiv>
      <LoginHelp>위 소셜 계정으로 로그인</LoginHelp>
    </>
  );
};

export default Login;
