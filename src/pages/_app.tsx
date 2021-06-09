import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import GlobalStyle, { fontFaceRules } from '../components/GlobalStyle.css';

import img_favicon from '../assets/img/logo.svg';
import ManropeMediumWoff2 from '../assets/fonts/Manrope-Medium-subset.woff2';
import ManropeExtraBoldWoff2 from '../assets/fonts/Manrope-ExtraBold-subset.woff2';

export const mainCoinsInfo = [
  {
    id: 'basic-attention-token',
    symbol: 'bat',
    name: 'Basic Attention Token',
  },
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
  { id: 'cardano', symbol: 'ada', name: 'Cardano' },
  { id: 'eos', symbol: 'eos', name: 'EOS' },
  { id: 'neo', symbol: 'neo', name: 'NEO' },
  { id: 'nuls', symbol: 'nuls', name: 'Nuls' },
  { id: 'ripple', symbol: 'xrp', name: 'XRP' },
  { id: 'binancecoin', symbol: 'bnb', name: 'Binance Coin' },
];

export const watchingCoinsInfo = [
  { id: 'ardor', symbol: 'ardr', name: 'Ardor' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
  { id: 'icon', symbol: 'icx', name: 'ICON' },
  { id: 'iota', symbol: 'miota', name: 'IOTA' },
  { id: 'litecoin', symbol: 'ltc', name: 'Litecoin' },
  { id: 'omisego', symbol: 'omg', name: 'OmiseGO' },
  { id: 'power-ledger', symbol: 'powr', name: 'Power Ledger' },
];

const COLORS = {
  '--shadow-dropdown-opener': ['0 2px 6px rgb(255 178 136 / 25%)', 'none'],
  '--shadow-dropdown-list': ['0 2px 6px rgb(136 198 255 / 25%)', 'none'],
  '--color-mode-circle': ['#B1B6C8', '#F3F4FE'],
  '--color-logo-fill': ['#FFF4E1', '#E5E1FF'],
  '--color-logo-stroke': ['#FF6B00', '#001AFF'],
  '--color-navlink': ['#EE732F', '#3E50FA'],
  '--color-table-border': ['rgba(255,107,0,0.1)', '#003CB0'],
  '--color-sorter': ['#A0C2F9', '#D4DAFB'],
  '--color-sorter-active': ['#5892E8', '#8893F2'],
  '--color-loader-primary': ['#f3f3f3', '#6476ad'],
  '--color-loader-secondary': ['#ecebeb', '#505d84'],
  '--color-black-white': ['#000', '#fff'],
  '--color-twitter-icon': ['#00c3ff', '#fff'],
  '--bg-body': ['white', '#1A1D33'],
  '--bg-dropdown': ['#fff', '#434661'],
  '--bg-navlink-inactive': ['#fff', '#BEC4FB'],
  '--bg-navlink-hover': ['rgba(255,107,0,0.1)', '#E8EAFF'],
  '--bg-table': ['white', '#090D2C'],
  '--bg-table-row-odd': ['#f7feff', '#121B3C'],
  '--bg-footer-links-github': ['#FFF0E8', '#000'],
  '--bg-footer-links-twitter': ['#FFF0E8', '#0045AC'],
  '--text-logo-title': ['#181B3A', '#fff'],
  '--text-header-cell': ['#65748e', '#CBD9F0'],
  '--text-header-cell-main': ['#FF6B00', '#8F9BFF'],
  '--text-tbody': ['#000', '#CFD6EF'],
  '--text-change-green': ['#4ae264', '#84D492'],
  '--text-change-red': ['#ff8282', '#F19090'],
};

const mainCoinsIdList = mainCoinsInfo.map((coinObj) => coinObj.id);
const watchingCoinsIdList = watchingCoinsInfo.map((coinObj) => coinObj.id);
const allCoinsIdList = mainCoinsIdList.concat(watchingCoinsIdList);
const COINGECKO_API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${allCoinsIdList.join()}&vs_currencies=usd%2Cbtc&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;
const CMC_API_URL = process.env.CMC_API_URL;

type CoinsDataContextType = {
  data, 
  isLoading, 
  isLoadingSec, 
  activeDataSource
  setActiveDataSource
};

type ThemeContextType = {
  colorMode, 
  setColorMode
}

export const CoinsDataContext = React.createContext<Partial<CoinsDataContextType>>({});
export const ThemeContext = React.createContext<Partial<ThemeContextType>>({});

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState(undefined);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'
    );
    rawSetColorMode(initialColorValue);
  }, []);

  function setColorMode(newValue) {
    const root = window.document.documentElement;

    rawSetColorMode(newValue);

    localStorage.setItem('color-mode', newValue);

    Object.keys(COLORS).map((propertyName) => {
      root.style.setProperty(
        propertyName,
        newValue === 'light' ? COLORS[propertyName][0] : COLORS[propertyName][1]
      );
    });
  }

  useEffect(() => {
    if (colorMode) {
      const metaThemeColor = document.querySelector('[name="theme-color"]');
      const getThemeColor = () => {
        if (colorMode === 'light') {
          return '#FF6B00';
        } else if (colorMode === 'dark') {
          return '#000326';
        }
      };
      metaThemeColor.setAttribute('content', getThemeColor());
    }
  }, [colorMode]);

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function App({ Component, pageProps }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSec, setIsLoadingSec] = useState(true);
  const [activeDataSource, setActiveDataSource] = useState('CoinGecko');

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (response.status >= 200 && response.status <= 299) {
      return await response.json();
    } else {
      alert(`Unable to fetch data. Status Code: ${response.status}`);
      return;
    }
  };

  useEffect(() => {
    fetchData(COINGECKO_API_URL).then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setIsLoading(true);
      setIsLoadingSec(true);
      if (activeDataSource === 'CoinGecko') {
        fetchData(COINGECKO_API_URL).then((data) => {
          setData(data);
          setIsLoading(false);
          setIsLoadingSec(false);
        });
      } else {
        fetchData(CMC_API_URL).then((data) => {
          setData(data.data);
          setIsLoading(false);
          setIsLoadingSec(false);
        });
      }
    }
  }, [activeDataSource]);

  return (
    <React.Fragment>
      <Head>
        <title>Hodler</title>
        <link rel="icon" href={img_favicon} />
        <link
          rel="preload"
          href={`${process.env.ASSET_PREFIX}${ManropeMediumWoff2}`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${process.env.ASSET_PREFIX}${ManropeExtraBoldWoff2}`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: fontFaceRules,
          }}
        ></style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (!location.href.endsWith('/') && location.pathname === '/hodler') {
              window.location = location.href + '/';
            }

            function getInitialColorMode() {
              const persistedColorPreference =
                window.localStorage.getItem('color-mode');
              const hasPersistedPreference =
                typeof persistedColorPreference === 'string';

              if (hasPersistedPreference) {
                return persistedColorPreference;
              }

              const mql = window.matchMedia('(prefers-color-scheme: dark)');
              const hasMediaQueryPreference = typeof mql.matches === 'boolean';

              if (hasMediaQueryPreference) {
                return mql.matches ? 'dark' : 'light';
              }

              return 'light';
            }

            const colorMode = getInitialColorMode();

            const root = document.documentElement;

            ${Object.keys(COLORS)
              .map((propertyName) => {
                return `root.style.setProperty(
                  '${propertyName}',
                  colorMode === 'light'
                    ? '${COLORS[propertyName][0]}'
                    : '${COLORS[propertyName][1]}'
                );`;
              })
              .join('')}

            root.style.setProperty('--initial-color-mode', colorMode);
          `,
          }}
        />
      </Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            metaThemeColor.setAttribute('content', colorMode == 'light' ? '#FF6B00' : '#000326');
            document.getElementsByTagName('head')[0].appendChild(metaThemeColor);        
          `,
        }}
      />
      <GlobalStyle />
      <CoinsDataContext.Provider
        value={{
          data,
          isLoading,
          activeDataSource,
          setActiveDataSource,
          isLoadingSec,
        }}
      >
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CoinsDataContext.Provider>
    </React.Fragment>
  );
}
