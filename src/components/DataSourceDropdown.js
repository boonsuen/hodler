import React, { useState } from 'react';
import styled from 'styled-components';
import useClickOutside from './useClickOutside';

import img_arrow from '../assets/img/datasource_arrow.svg';
import img_ellipse from '../assets/img/datasource_ellipse.svg';

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

function useDropdown(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle];
}

const DataSourceDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = (e) => {
    setIsDropdownOpen(isOpen => !isOpen);
  };

  const clickRef = React.useRef();
  useClickOutside(clickRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <DropdownContainer ref={clickRef}>
      <DropdownOpener onClick={toggleDropdown} type="button">Data source<div><img src={img_arrow} /></div></DropdownOpener>
      <DropdownList visible={isDropdownOpen ? 1 : 0}>
        <ListItem>
          <button type="button">CoinGecko<div><img src={img_ellipse} /></div></button>
        </ListItem>
        <ListItem>
          <button type="button">CoinMarketCap<div><img src={img_ellipse} /></div></button>
        </ListItem>
      </DropdownList>
    </DropdownContainer>
  );
}

export default DataSourceDropdown;