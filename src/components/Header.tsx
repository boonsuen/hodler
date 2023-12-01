import React, { useContext } from 'react';
import DataSourceDropdown from './DataSourceDropdown';
import clsx from 'clsx';
import { ThemeContext, ThemeContextType } from '@/context/ThemeContext';

const Mode = () => {
  const { colorMode, setColorMode } = useContext(
    ThemeContext
  ) as ThemeContextType;
  const handleSwitchColorMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    colorMode === 'dark' ? setColorMode('light') : setColorMode('dark');
  };

  return (
    <button
      className="h-full pr-[10px] border-none bg-none outline-none"
      onClick={handleSwitchColorMode}
      aria-label="Switch theme"
    >
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
    </button>
  );
};

const Logo = () => (
  <svg
    className="w-[35px] mb-[14px] max-[550px]:w-[32px]"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 327.7 368.2"
    xmlSpace="preserve"
  >
    <rect
      x="106.8"
      y="136.4"
      className="st0 fill-[var(--color-logo-fill)]"
      width="206"
      height="149"
    />
    <path
      className="st1 fill-[var(--color-logo-fill)] stroke-[var(--color-logo-stroke)] stroke-[17.6589]"
      strokeMiterlimit="10"
      d="M217,168.9h-3.3c-18.1,0-32.8-14.7-32.8-32.8V49.6c0-18.1,14.7-32.8,32.8-32.8h3.3c18.1,0,32.8,14.7,32.8,32.8
    v86.5C249.8,154.2,235.1,168.9,217,168.9z"
    />
    <path
      className="st1 fill-[var(--color-logo-fill)] stroke-[var(--color-logo-stroke)] stroke-[17.6589]"
      strokeMiterlimit="10"
      d="M79,168.9h-3.3c-18.1,0-32.8-14.7-32.8-32.8V49.6c0-18.1,14.7-32.8,32.8-32.8H79c18.1,0,32.8,14.7,32.8,32.8
    v86.5C111.8,154.2,97.1,168.9,79,168.9z"
    />
    <path
      className="st1 fill-[var(--color-logo-fill)] stroke-[var(--color-logo-stroke)] stroke-[17.6589]"
      strokeMiterlimit="10"
      d="M148,160.9h-3.3c-18.1,0-32.8-14.7-32.8-32.8V41.6c0-18.1,14.7-32.8,32.8-32.8h3.3c18.1,0,32.8,14.7,32.8,32.8
    v86.5C180.8,146.2,166.1,160.9,148,160.9z"
    />
    <path
      className="st2 fill-[var(--color-logo-fill)] stroke-[var(--color-logo-stroke)] stroke-[17.6589]"
      strokeLinecap="square"
      strokeLinejoin="bevel"
      strokeMiterlimit="10"
      d="M180.8,270.4c0-22.2-35-42-69-56c61-13,69-106,69-106H43l-28.1,49.5c-3.9,6.9-6,14.7-6,22.7v89
    c0,18.5,7.3,36.2,20.2,49.4l39.8,40.5h226l20.5-59.7c2.3-6.8,3.5-14,3.5-21.2V141.7"
    />
    <path
      className="st1 fill-[var(--color-logo-fill)] stroke-[var(--color-logo-stroke)] stroke-[17.6589]"
      strokeMiterlimit="10"
      d="M286,192.9h-3.3c-18.1,0-32.8-14.7-32.8-32.8V73.6c0-18.1,14.7-32.8,32.8-32.8h3.3c18.1,0,32.8,14.7,32.8,32.8
    v86.5C318.8,178.2,304.1,192.9,286,192.9z"
    />
  </svg>
);

const Header = () => (
  <div
    className={clsx(
      'flex flex-col justify-end items-center',
      'h-[166px] w-[80%] max-w-[720px] m-auto relative',
      'max-[700px]:w-[90%] max-[550px]:h-[150px]'
    )}
  >
    <div className="w-full flex justify-between items-center self-start">
      <Mode />
      <DataSourceDropdown />
    </div>
    <Logo />
    <div
      className={clsx(
        'text-[34px] text-center text-[var(--text-logo-title)]',
        'mb-[19px] max-[550px]:text-[28px] leading-[1.15] font-bold'
      )}
    >
      Hodler
    </div>
  </div>
);

export default Header;
