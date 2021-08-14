import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from './pictures/school_white.png';

const TopNav = styled.div`
  background-color: #61aaff;
  height: 100px;
  color: white;
  display: flex;
`;

const NavTitle = styled.div`
  align-self: center;
  font-weight: bold;
  font-size: 40px;
  padding-left: 50px;
  flex: 1;

  cursor: pointer;
  &:hover {
    color: whitesmoke;
  }
`;

const TitleLinkStyle = {
  alignSelf: 'center',
  textDecoration: 'none',
  color: 'white',
};

const SubNav = styled.div`
  padding-right: 50px;
  align-self: center;
  font-size: 25px;
  display: flex;
  flex: 1;
`;

const HomeDiv = styled.div`
  padding-left: 25px;
  &:hover {
    color: whitesmoke;
  }
`;

const LoginDiv = styled.div`
  padding-left: 25px;
  &:hover {
    color: whitesmoke;
  }
`;

const Header = ({ user, logout }) => {
  return (
    <>
      <TopNav>
        <Link to="/" style={TitleLinkStyle}>
          <NavTitle>
            <img
              src={logo}
              width="50"
              height="50"
              color="white"
              style={{ paddingRight: '25px', alignSelf: 'center' }}
              alt="logo"
            />
            월요일 싫어
          </NavTitle>
        </Link>
        <div style={{ display: 'flex', flex: 4 }} />
        <SubNav>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <HomeDiv>Home</HomeDiv>
          </Link>
          {!user.snsId && (
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <LoginDiv>Login</LoginDiv>
            </Link>
          )}
          {user.snsId && (
            <>
              <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
                <LoginDiv onClick={logout}>Logout</LoginDiv>
              </a>
              <Link
                to="/options"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                <LoginDiv>Options</LoginDiv>
              </Link>
            </>
          )}
        </SubNav>
      </TopNav>
    </>
  );
};

export default Header;
