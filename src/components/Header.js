import React from 'react';
import styled from 'styled-components';
import DataSourceDropdown from './DataSourceDropdown';

import img_logo from '../assets/img/logo.svg';

import { media } from './GlobalStyle.css';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 166px;
  ${media.s`height: 150px`};
  ${media.m`width: 90%;`}
  width: 80%;
  max-width: 720px;
  margin: auto;
  position: relative;
`;

const TopContainer = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 35px;
  margin-bottom: 14px;
  ${media.s`width: 32px;`}
`;

const Title = styled.div`
  color: #181B3A;
  font-size: 34px;
  text-align: center;
  margin-bottom: 19px;
  line-height: 1.15;
  ${media.s`font-size: 28px;`}
`;

const ModeButton = styled.button`
  height: 100%;
  padding: 0 10px 0 0;
  border: none;
  background: none;
  outline: none;
`;

const Mode = () => (
  <ModeButton>
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="#B1B6C8" />
      <path
        d="M16 9C16 13.0787 12.8659 16 9 16C9 16 9.00005 13.0787 9.00005 9C9.00005 4.92128 9 2 9 2C12.8659 2 16 4.92128 16 9Z"
        fill="white"
      />
    </svg>
  </ModeButton>
);

const Header = () => (
  <StyledHeader>
    <TopContainer>
      <Mode />
      <DataSourceDropdown />
    </TopContainer>    
    <Logo src={img_logo} alt="Logo" />
    <Title>Hodler</Title>
  </StyledHeader>
);

export default Header;