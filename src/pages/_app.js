import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import GlobalStyle, { fontFaceRules } from '../components/GlobalStyle.css';

import img_favicon from '../assets/img/logo.svg';
import ManropeMediumWoff2 from '../assets/fonts/Manrope-Medium.woff2';
import ManropeExtraBoldWoff2 from '../assets/fonts/Manrope-ExtraBold.woff2';

export const mainCoinsInfo = [
  {
    id: 'basic-attention-token',
    symbol: 'bat',
    name: 'Basic Attention Token'
  },
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
  { id: 'cardano', symbol: 'ada', name: 'Cardano' },
  { id: 'eos', symbol: 'eos', name: 'EOS' },
  { id: 'neo', symbol: 'neo', name: 'NEO' },
  { id: 'nuls', symbol: 'nuls', name: 'Nuls' },
  { id: 'power-ledger', symbol: 'powr', name: 'Power Ledger' },
  { id: 'wabi', symbol: 'wabi', name: 'Tael' }
];

export const watchingCoinsInfo = [
  { id: 'ardor', symbol: 'ardr', name: 'Ardor' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
  { id: 'ethlend', symbol: 'lend', name: 'Aave' },
  { id: 'icon', symbol: 'icx', name: 'ICON' },
  { id: 'iota', symbol: 'miota', name: 'IOTA' },
  { id: 'litecoin', symbol: 'ltc', name: 'Litecoin' },
  { id: 'monaco', symbol: 'mco', name: 'MCO' },
  { id: 'omisego', symbol: 'omg', name: 'OmiseGO' },
  { id: 'ripple', symbol: 'xrp', name: 'XRP' }
];

const mainCoinsIdList = mainCoinsInfo.map(coinObj => coinObj.id);
const watchingCoinsIdList = watchingCoinsInfo.map(coinObj => coinObj.id);
const allCoinsIdList = mainCoinsIdList.concat(watchingCoinsIdList);
const API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${allCoinsIdList.join()}&vs_currencies=usd%2Cbtc&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;

export const CoinsDataContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [data, setData ] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      if (response.status >= 200 && response.status <= 299) {
        return await response.json();
      } else { 
        alert(`Unable to fetch data. Status Code: ${response.status}`);
        return; 
      }
    };

    fetchData().then(data => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Hodler</title>        
        <meta name="theme-color" content="#FF6B00" />
        <link rel="icon" href={img_favicon} />
        <link rel="preload" href={`${process.env.ASSET_PREFIX}${ManropeMediumWoff2}`} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={`${process.env.ASSET_PREFIX}${ManropeExtraBoldWoff2}`} as="font" type="font/woff2" crossOrigin="anonymous" />        
        <style dangerouslySetInnerHTML={{ 
          __html: fontFaceRules 
        }}></style>
        <script dangerouslySetInnerHTML={{
          __html: `
          (function() {
            if (!location.href.endsWith('/') && location.pathname === '/hodler') {
              window.location = location.href + '/';
            }
          }())
          `
        }} />
      </Head>
      <GlobalStyle />
      <Layout>
        <CoinsDataContext.Provider value={{ data, isLoading }}>
          <Component {...pageProps} />
        </CoinsDataContext.Provider>
      </Layout>
    </React.Fragment>
  );
}