import React, {
  useState,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import useClickOutside from '../hooks/useClickOutside';

import { DataSource } from '@/types';
import clsx from 'clsx';
import {
  CoinsDataContext,
  CoinsDataContextType,
} from '@/context/CoinsDataContext';

// const DropdownList = styled.ul<DropdownListProps>`
//   transform: ${(props) =>
//     props.visible ? 'translateY(0)' : 'translateY(8px)'};
//   visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
//   opacity: ${(props) => (props.visible ? '1' : '0')};
//   transition: transform 0.2s ease-in-out,
//     ${(props) =>
//       props.visible ? 'opacity .3s' : 'visibility 0s .3s, opacity .3s'};
// `;

const GreenEllipse: React.FC<{
  isActiveItem: boolean;
}> = ({ isActiveItem }) => (
  <div
    className={clsx('ml-2 w-2', isActiveItem && 'pointer-events-none')}
    style={{
      visibility: isActiveItem ? 'visible' : 'hidden',
      opacity: isActiveItem ? '1' : '0',
      transition: isActiveItem
        ? 'opacity 0.35s'
        : 'visibility 0s 0.35s, opacity 0.35s',
    }}
  >
    <img src="/img/datasource_ellipse.svg" alt="green circle indicator" />
  </div>
);

const ListItem = ({
  dataSourceName,
  activeDataSource,
  setActiveDataSource,
}: {
  dataSourceName: DataSource;
  activeDataSource: DataSource;
  setActiveDataSource: Dispatch<SetStateAction<DataSource>>;
}) => {
  const isActiveItem = dataSourceName === activeDataSource;

  const handleDataSourceChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActiveItem) {
      setActiveDataSource(dataSourceName);
    }
  };

  return (
    <li>
      <button
        className={clsx(
          'text-[var(--text-logo-title)] h-[34px] px-3 bg-[var(--bg-dropdown)]',
          'flex justify-between items-center border border-[--bg-dropdown]',
          'max-[550px]:h-[30px] max-[550px]:px-2 max-[550px]:text-[12px] w-full',
          isActiveItem
            ? 'hover:border-[var(--bg-dropdown)]'
            : 'hover:border-[rgba(3,169,245,0.13)]'
        )}
        type="button"
        onClick={handleDataSourceChange}
      >
        {dataSourceName}
        <GreenEllipse isActiveItem={isActiveItem} />
      </button>
    </li>
  );
};

const DataSourceDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { activeDataSource, setActiveDataSource } = useContext(
    CoinsDataContext
  ) as CoinsDataContextType;

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropdownOpen((isOpen) => !isOpen);
  };

  const clickRef = useRef(null);
  useClickOutside(clickRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div ref={clickRef} className="text-sm">
      <button
        onClick={toggleDropdown}
        type="button"
        className={clsx(
          'text-[var(--text-logo-title)] h-[34px] px-3 bg-[var(--bg-dropdown)]',
          'flex justify-between items-center border border-[--bg-dropdown]',
          'max-[550px]:h-[30px] max-[550px]:px-2 max-[550px]:text-[12px]'
        )}
        style={{
          boxShadow: 'var(--shadow-dropdown-opener)',
        }}
      >
        Data source
        <div>
          <img
            className="ml-2 transition-opacity duration-1000"
            src="/img/datasource_arrow.svg"
            alt="Down arrow, open menu"
          />
        </div>
      </button>
      <ul
        className="my-4 absolute p-0 right-0 list-none"
        style={{
          boxShadow: 'var(--shadow-dropdown-list)',
          transform: isDropdownOpen ? 'translateY(0)' : 'translateY(8px)',
          visibility: isDropdownOpen ? 'visible' : 'hidden',
          opacity: isDropdownOpen ? '1' : '0',
          transition: isDropdownOpen
            ? 'transform 0.2s ease-in-out, opacity 0.3s'
            : 'transform 0.2s ease-in-out, visibility 0s 0.3s, opacity 0.3s',
        }}
      >
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
      </ul>
    </div>
  );
};

export default DataSourceDropdown;
