import React from 'react';
import styled from 'styled-components';

import img_github from '../assets/img/github.svg';
import img_twitter from '../assets/img/twitter.svg';
import img_logo from '../assets/img/logo.svg';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 170px;
  width: 80%;
  max-width: 720px;
  margin: auto;
  position: relative;
`;

const Links = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  margin-top: 8px;

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
`;

const Title = styled.div`
  color: #181B3A;
  font-size: 34px;
  text-align: center;
  margin-bottom: 19px;
`;

const Header = () => (
  <StyledHeader>
    <Links>
      <a href="https://github.com/boonsuen/hodler-react" target="_blank" rel="noopener">
        <img src={img_github} alt="GitHub icon" />
      </a>
      <a href="https://twitter.com/boon_suen" target="_blank" rel="noopener">
        <img src={img_twitter} alt="Twitter icon" />
      </a>
    </Links>
    <Logo src={img_logo} alt="Hodler logo" />
    <Title>Hodler</Title>
  </StyledHeader>
);

export default Header;