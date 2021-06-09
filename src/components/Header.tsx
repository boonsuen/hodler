import React from 'react';
import styled from 'styled-components';
import DataSourceDropdown from './DataSourceDropdown';

import { media } from './GlobalStyle.css';
import { ThemeContext } from '../pages/_app'

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 166px;
  ${media['s']`height: 150px`};
  ${media['m']`width: 90%;`}
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

const Title = styled.div`
  color: var(--text-logo-title);
  font-size: 34px;
  text-align: center;
  margin-bottom: 19px;
  line-height: 1.15;
  ${media['s']`font-size: 28px;`}
`;

const ModeButton = styled.button`
  height: 100%;
  padding: 0 10px 0 0;
  border: none;
  background: none;
  outline: none;
`;

const Mode = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);
  const handleSwitchColorMode = e => {
    colorMode === 'dark' ?
      setColorMode('light') :
      setColorMode('dark');
  };
  return (
    <ModeButton onClick={handleSwitchColorMode}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="9" fill="var(--color-mode-circle)" />
        <path
          d="M16 9C16 13.0787 12.8659 16 9 16C9 16 9.00005 13.0787 9.00005 9C9.00005 4.92128 9 2 9 2C12.8659 2 16 4.92128 16 9Z"
          fill="var(--bg-body)"
        />
      </svg>
    </ModeButton>
  );
};

const StyledLogo = styled.svg`
  width: 35px;
  margin-bottom: 14px;
  ${media['s']`width: 32px;`}

  .st0 {
    fill:var(--color-logo-fill);
  }
  .st1 {
    fill:var(--color-logo-fill);
    stroke:var(--color-logo-stroke);
    stroke-width:17.6589;
    stroke-miterlimit:10;
  }
  .st2 {
    fill:var(--color-logo-fill);
    stroke:var(--color-logo-stroke);
    stroke-width:17.659;
    stroke-linecap:square;
    stroke-linejoin:bevel;
    stroke-miterlimit:10;
  }
`;

const Logo = () => (
  <StyledLogo version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 327.7 368.2" xmlSpace="preserve">    
    <rect x="106.8" y="136.4" className="st0" width="206" height="149"/>
    <path className="st1" d="M217,168.9h-3.3c-18.1,0-32.8-14.7-32.8-32.8V49.6c0-18.1,14.7-32.8,32.8-32.8h3.3c18.1,0,32.8,14.7,32.8,32.8
    v86.5C249.8,154.2,235.1,168.9,217,168.9z"/>
    <path className="st1" d="M79,168.9h-3.3c-18.1,0-32.8-14.7-32.8-32.8V49.6c0-18.1,14.7-32.8,32.8-32.8H79c18.1,0,32.8,14.7,32.8,32.8
    v86.5C111.8,154.2,97.1,168.9,79,168.9z"/>
    <path className="st1" d="M148,160.9h-3.3c-18.1,0-32.8-14.7-32.8-32.8V41.6c0-18.1,14.7-32.8,32.8-32.8h3.3c18.1,0,32.8,14.7,32.8,32.8
    v86.5C180.8,146.2,166.1,160.9,148,160.9z"/>
    <path className="st2" d="M180.8,270.4c0-22.2-35-42-69-56c61-13,69-106,69-106H43l-28.1,49.5c-3.9,6.9-6,14.7-6,22.7v89
    c0,18.5,7.3,36.2,20.2,49.4l39.8,40.5h226l20.5-59.7c2.3-6.8,3.5-14,3.5-21.2V141.7"/>
    <path className="st1" d="M286,192.9h-3.3c-18.1,0-32.8-14.7-32.8-32.8V73.6c0-18.1,14.7-32.8,32.8-32.8h3.3c18.1,0,32.8,14.7,32.8,32.8
    v86.5C318.8,178.2,304.1,192.9,286,192.9z"/>
  </StyledLogo>
);

const Header = () => (
  <StyledHeader>
    <TopContainer>
      <Mode />
      <DataSourceDropdown />
    </TopContainer>
    <Logo />
    <Title>Hodler</Title>
  </StyledHeader>
);

export default Header;