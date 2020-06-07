import { useState } from 'react';
import styled from 'styled-components';
import useToggle from './useToggle';

import img_github from '../assets/img/github.svg';
import img_twitter from '../assets/img/twitter.svg';
import img_logo from '../assets/img/logo.svg';
import img_arrow from '../assets/img/datasource_arrow.svg';
import img_ellipse from '../assets/img/datasource_ellipse.svg';

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

const DropdownContainer = styled.div`
  button {
    color: #181B3A;
    height: 34px;
    border: none;
    background: #fff;
    padding: 0px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &:focus {
      outline: none;
    }
  }
`;

const DropdownOpener = styled.button`
  box-shadow: 0 2px 6px rgb(255 178 136 / 25%);

  img {
    margin-left: 8px;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  right: 0;
  padding: 0;
  box-shadow: 0 2px 6px rgb(136 198 255 / 25%);
  list-style: none;
  transform: ${props => props.visible 
    ? 'translateY(0)'
    : 'translateY(8px)'};

  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: transform .2s ease-in-out, ${props => props.visible
    ? 'opacity .3s'
    : 'visibility 0s .3s, opacity .3s'}
`;

const ListItem = styled.li`
  button {    
    width: 100%;
  }

  div {
    margin-left: 8px;
    width: 8px;
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

const Header = () => {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle();

  return (
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
        <DropdownContainer>
          <DropdownOpener onClick={toggleIsDropdownOpen} type="button">Data source<div><img src={img_arrow} /></div></DropdownOpener>
          <DropdownList visible={isDropdownOpen ? 1 : 0}>
            <ListItem>
              <button type="button">CoinGecko<div><img src={img_ellipse} /></div></button>
            </ListItem>
            <ListItem>
              <button type="button">CoinMarketCap<div><img src={img_ellipse} /></div></button>
            </ListItem>
          </DropdownList>
        </DropdownContainer>        
      </LinksAndDropdownContainer>    
      <Logo src={img_logo} alt="Logo" />
      <Title>Hodler</Title>
    </StyledHeader>
  );
};

export default Header;