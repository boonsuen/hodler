import React, { useState } from 'react';
import styled from 'styled-components';
import useClickOutside from './useClickOutside';

import img_arrow from '../assets/img/datasource_arrow.svg';
import img_ellipse from '../assets/img/datasource_ellipse.svg';

const DropdownContainer = styled.div`
  button {
    color: #181B3A;
    height: 34px;
    border: 1px solid #fff;
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
    transition: opacity 1s;
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

const StyledListItem = styled.li`
  button {    
    width: 100%;

    &:hover {
      border-color: ${props => !props.isActiveItem ? 'rgb(3 169 245 / 13%)' : '#fff'};
    }
  }

  div {
    margin-left: 8px;
    width: 8px;
  }
`;

const StyledGreenEllipse = styled.div`
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: ${props => props.visible
    ? 'opacity 0.35s'
    : 'visibility 0s 0.35s, opacity 0.35s'}
`;

const GreenEllipse = ({ isActiveItem }) => (
  <StyledGreenEllipse visible={isActiveItem}>
    <img src={img_ellipse} />
  </StyledGreenEllipse>
);

const ListItem = ({ 
  dataSourceName, 
  currentActiveDataSource, 
  setCurrentActiveDataSource 
}) => {
  const isActiveItem = dataSourceName === currentActiveDataSource;

  const handleDataSourceChange = (e) => {
    if (!isActiveItem) {
      setCurrentActiveDataSource(dataSourceName);
    }
  };

  return (
    <StyledListItem onClick={handleDataSourceChange} isActiveItem={isActiveItem}>
      <button type="button">
        {dataSourceName}
        <GreenEllipse isActiveItem={isActiveItem} />
      </button>
    </StyledListItem>
  );
};

const DataSourceDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentActiveDataSource, setCurrentActiveDataSource] = useState('CoinGecko');
  
  const toggleDropdown = (e) => {
    setIsDropdownOpen(isOpen => !isOpen);
  };

  const clickRef = React.useRef();
  useClickOutside(clickRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <DropdownContainer ref={clickRef}>
      <DropdownOpener onClick={toggleDropdown} type="button">
        Data source<div><img src={img_arrow} /></div>
      </DropdownOpener>
      <DropdownList visible={isDropdownOpen ? 1 : 0}>
        <ListItem 
          setCurrentActiveDataSource={setCurrentActiveDataSource}
          dataSourceName="CoinGecko" 
          currentActiveDataSource={currentActiveDataSource} 
        />
        <ListItem 
          setCurrentActiveDataSource={setCurrentActiveDataSource}
          dataSourceName="CoinMarketCap" 
          currentActiveDataSource={currentActiveDataSource} 
        />      
      </DropdownList>
    </DropdownContainer>
  );
};

export default DataSourceDropdown;