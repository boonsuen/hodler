import { useState, useEffect, useContext, useRef } from 'react';
import Table from '../components/Table';

import { CoinsDataContext, watchingCoinsInfo } from './_app';

const Watch = () => {
  const { data, isLoading, isLoadingSec, activeDataSource } = useContext(CoinsDataContext);
  const isInitialMount = useRef(true);

  const cmcCoinIds = [1027,2,1720,1808,2099,1320,2132];

  const prevDataRef = useRef();
  useEffect(() => {
    prevDataRef.current = data;
  });
  const prevData = prevDataRef.current;
  
  const coinsDataForState = (isLoading || data === prevData) ? [] : (activeDataSource === 'CoinGecko' ? watchingCoinsInfo.map(coin => {
    return {
      ...coin,
      ...data[coin.id],
      usd: Number(Math.round(data[coin.id].usd+'e2')+'e-2'),
      btc: Math.floor(data[coin.id].btc * 100000000),
      usd_24h_change: Number(Math.round(data[coin.id].usd_24h_change+'e2')+'e-2')
    }
  }).sort((a, b) => b.usd_market_cap - a.usd_market_cap) : Object.values(data).filter(coin => {
    return cmcCoinIds.some(id => id === coin.id);
  }).map((coin) => {
    return {
      ...coin,
      usd: Number(Math.round(coin.quote.USD.price+'e2')+'e-2'),
      usd_24h_change: Number(Math.round(coin.quote.USD.percent_change_24h+'e2')+'e-2'),
      usd_market_cap: coin.quote.USD.market_cap
    }
  }).sort((a, b) => b.usd_market_cap - a.usd_market_cap));

  const [coinsData, setCoinsData] = useState(coinsDataForState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (activeDataSource === 'CoinGecko' && !isLoading && isLoadingSec) {
        setCoinsData(watchingCoinsInfo.map(coin => {
          return {
            ...coin,
            ...data[coin.id],
            usd: Number(Math.round(data[coin.id].usd+'e2')+'e-2'),
            btc: Math.floor(data[coin.id].btc * 100000000),
            usd_24h_change: Number(Math.round(data[coin.id].usd_24h_change+'e2')+'e-2')
          }
        }).sort((a, b) => b.usd_market_cap - a.usd_market_cap));
      } else if (activeDataSource === 'CoinMarketCap' && !isLoading) {  
        setCoinsData(Object.values(data).filter(coin => {
          return cmcCoinIds.some(id => id === coin.id);
        }).map((coin) => {
          return {
            ...coin,
            usd: Number(Math.round(coin.quote.USD.price+'e2')+'e-2'),
            usd_24h_change: Number(Math.round(coin.quote.USD.percent_change_24h+'e2')+'e-2'),
            usd_market_cap: coin.quote.USD.market_cap
          }
        }).sort((a, b) => b.usd_market_cap - a.usd_market_cap));
      }
    }
  }, [isLoading, isLoadingSec, activeDataSource, data]);

  return (
    <Table 
      data={coinsData}
      setData={setCoinsData}
      isLoading={isLoading}
      rowLength={watchingCoinsInfo.length}
      activeDataSource={activeDataSource}
    />
  );
};

export default Watch;