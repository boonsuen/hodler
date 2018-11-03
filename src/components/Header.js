import React from 'react';
import styled from 'styled-components';

import img_github from '../assets/img/github.svg';
import img_twitter from '../assets/img/twitter.svg';
import img_logo from '../assets/img/logo.svg';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 160px;
  position: relative;
  width: 80%;
  max-width: 720px;
  margin: auto;
`;

const Links = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;

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

const StyledHeader = () => (
  <Header>
    <Links>
      <a href="https://github.com/boonsuen/hodler-react" target="_blank">
        <img src={img_github} />
      </a>
      <a href="https://twitter.com/SatoshiJS" target="_blank">
        <img src={img_twitter} />
      </a>
    </Links>
    <Logo src={img_logo} />
    <Title>Hodler</Title>
  </Header>
);

export default StyledHeader;