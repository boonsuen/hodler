import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import useClickOutside from './useClickOutside';

import { CoinsDataContext } from '../pages/_app';
import { media } from './GlobalStyle.css';

import img_arrow from '../assets/img/datasource_arrow.svg';
import img_ellipse from '../assets/img/datasource_ellipse.svg';

const DropdownContainer = styled.div`
  button {
    color: var(--text-logo-title);
    height: 34px;
    border: 1px solid var(--bg-dropdown);
    border-radius: 0;
    background: var(--bg-dropdown);
    padding: 0px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media['s']`
    height: 30px;
    padding: 0px 8px;
    font-size: 12px;
    `}

    &:focus {
      outline: none;
    }
  }
`;

const DropdownOpener = styled.button`
  box-shadow: var(--shadow-dropdown-opener);

  img {
    margin-left: 8px;
    transition: opacity 1s;
  }
`;

interface DropdownListProps {
  readonly visible: boolean;
}

const DropdownList = styled.ul<DropdownListProps>`
  position: absolute;
  right: 0;
  padding: 0;
  box-shadow: var(--shadow-dropdown-list);
  list-style: none;
  transform: ${(props) =>
    props.visible ? 'translateY(0)' : 'translateY(8px)'};

  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: transform 0.2s ease-in-out,
    ${(props) =>
      props.visible ? 'opacity .3s' : 'visibility 0s .3s, opacity .3s'};
`;

const StyledListItem = styled.li<{
  isActiveItem: boolean;
}>`
  button {
    width: 100%;

    &:hover {
      border-color: ${(props) =>
        !props.isActiveItem ? 'rgb(3 169 245 / 13%)' : 'var(--bg-dropdown)'};
    }
  }

  div {
    margin-left: 8px;
    width: 8px;
  }
`;

const StyledGreenEllipse = styled.div<{
  visible: boolean;
}>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: ${(props) =>
    props.visible ? 'opacity 0.35s' : 'visibility 0s 0.35s, opacity 0.35s'};
  ${(props) => props.visible && ('pointer-events: none;')}
`;

const GreenEllipse: React.FC<{
  isActiveItem: boolean;
}> = ({ isActiveItem }) => (
  <StyledGreenEllipse visible={isActiveItem}>
    <img src={img_ellipse} alt="green circle indicator" />
  </StyledGreenEllipse>
);

const ListItem = ({
  dataSourceName,
  activeDataSource,
  setActiveDataSource,
}) => {
  const isActiveItem = dataSourceName === activeDataSource;

  const handleDataSourceChange = (e) => {
    if (!isActiveItem) {
      setActiveDataSource(dataSourceName);
    }
  };

  return (
    <StyledListItem
      onClick={handleDataSourceChange}
      isActiveItem={isActiveItem}
    >
      <button type="button">
        {dataSourceName}
        <GreenEllipse isActiveItem={isActiveItem} />
      </button>
    </StyledListItem>
  );
};

const DataSourceDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { activeDataSource, setActiveDataSource } =
    useContext(CoinsDataContext);

  const toggleDropdown = (e) => {
    setIsDropdownOpen((isOpen) => !isOpen);
  };

  const clickRef = React.useRef();
  useClickOutside(clickRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <DropdownContainer ref={clickRef}>
      <DropdownOpener onClick={toggleDropdown} type="button">
        Data source
        <div>
          <img src={img_arrow} alt="Down arrow, open menu" />
        </div>
      </DropdownOpener>
      <DropdownList visible={isDropdownOpen ? true : false}>
        <ListItem
          setActiveDataSource={setActiveDataSource}
          dataSourceName="CoinGecko"
          activeDataSource={activeDataSource}
        />
        <ListItem
          setActiveDataSource={setActiveDataSource}
          dataSourceName="CoinMarketCap"
          activeDataSource={activeDataSource}
        />
      </DropdownList>
    </DropdownContainer>
  );
};

export default DataSourceDropdown;
