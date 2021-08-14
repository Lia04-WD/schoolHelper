import React from 'react';
import styled from 'styled-components';

import downHuman from './pictures/downHuman.png';
import thinkingHuman from './pictures/thinkingHuman.png';
import infoImage from './pictures/infoImage.png';

import HeaderContainer from '../components/HeaderContainer';

const DisplayInfo = styled.div`
  display: flex;
  padding: 100px 100px 0px 100px;
`;

const InlineDisplayInfo = styled.div`
  flex: 1;
  width: 350px;
  height: 350px;

  & img {
    width: 350px;
    height: 350px;
  }

  & div {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }
`;

const blankDiv = {
  display: 'flex',
  flex: 1,
};

const Intro = () => {
  return (
    <>
      <HeaderContainer />
      <DisplayInfo>
        <InlineDisplayInfo>
          <img src={downHuman} alt="downHuman" />
          <div>
            여러분들의 힘든 월요일 아침에
            <br />
            '월요일 싫어'가 버프를
            <br />
            걸어드리겠습니다
          </div>
        </InlineDisplayInfo>
        <div style={blankDiv} />
        <InlineDisplayInfo>
          <img src={infoImage} alt="infoImage" />
          <div>
            버스가 언제오는지 몰라도
            <br />
            당황하지 마십시오
            <br />
            저희가 언제든지 도와드리겠습니다
          </div>
        </InlineDisplayInfo>
        <div style={blankDiv} />
        <InlineDisplayInfo>
          <img src={thinkingHuman} alt="thinkingHuman" />
          <div>
            정보화 시대에 시간표와 급식을
            <br />
            외우지 마십시오
            <br />
            저희가 알려드리겠습니다
          </div>
        </InlineDisplayInfo>
      </DisplayInfo>
    </>
  );
};

export default Intro;
