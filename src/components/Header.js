import React from 'react';
import styled from 'styled-components';
import DataSourceDropdown from './DataSourceDropdown';

import img_github from '../assets/img/github.svg';
import img_twitter from '../assets/img/twitter.svg';
import img_logo from '../assets/img/logo.svg';

import { media } from './GlobalStyle.css';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 166px;
  ${media.s`height: 150px`};
  width: 80%;
  max-width: 720px;
  margin: auto;
  position: relative;
`;

const LinksAndDropdownContainer = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SocialLinks = styled.div`
  a {
    margin: 10px 13px 0 0;
  }

  img {
    width: 27px;
  }
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

const Header = () => (
  <StyledHeader>
    <LinksAndDropdownContainer>
      <SocialLinks>
        <a href="https://github.com/boonsuen/hodler-react" target="_blank" rel="noopener">
          <img src={img_github} alt="GitHub" />
        </a>
        <a href="https://twitter.com/_wnxn" target="_blank" rel="noopener">
          <img src={img_twitter} alt="Twitter" />
        </a>
      </SocialLinks>
      <DataSourceDropdown />
    </LinksAndDropdownContainer>    
    <Logo src={img_logo} alt="Logo" />
    <Title>Hodler</Title>
  </StyledHeader>
);

export default Header;