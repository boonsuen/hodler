import { useState, useEffect, useContext, useRef } from 'react';
import Table from '../components/Table';
import {
  CoinsDataContext,
  CoinsDataContextType,
} from '@/context/CoinsDataContext';
import { watchingCoinsInfo } from '@/configs';

const Watch = () => {
  const { data, isLoading, activeDataSource } = useContext(
    CoinsDataContext
  ) as CoinsDataContextType;
  const isInitialMount = useRef(true);

  const cmcCoinIds = [1027, 2, 1720, 1808, 2099, 1320, 2132];

  const prevDataRef = useRef();
  useEffect(() => {
    prevDataRef.current = data;
  });
  const prevData = prevDataRef.current;

  const coinsDataForState =
    isLoading || data === prevData
      ? []
      : activeDataSource === 'CoinGecko'
      ? watchingCoinsInfo
          .map((coin) => {
            return {
              ...coin,
              ...data[coin.id],
              usd: Number(Math.round(Number(data[coin.id].usd + 'e2')) + 'e-2'),
              btc: Math.floor(data[coin.id].btc * 100000000),
              usd_24h_change: Number(
                Math.round(Number(data[coin.id].usd_24h_change + 'e2')) + 'e-2'
              ),
            };
          })
          .sort((a, b) => b.usd_market_cap - a.usd_market_cap)
      : Object.values(data)
          .filter((coin: any) => {
            return cmcCoinIds.some((id) => id === coin.id);
          })
          .map((coin: any) => {
            return {
              ...coin,
              usd: Number(
                Math.round(Number(coin.quote.USD.price + 'e2')) + 'e-2'
              ),
              usd_24h_change: Number(
                Math.round(Number(coin.quote.USD.percent_change_24h + 'e2')) +
                  'e-2'
              ),
              usd_market_cap: coin.quote.USD.market_cap,
            };
          })
          .sort((a, b) => b.usd_market_cap - a.usd_market_cap);

  const [coinsData, setCoinsData] = useState(coinsDataForState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (activeDataSource === 'CoinGecko' && !isLoading) {
        setCoinsData(
          watchingCoinsInfo
            .map((coin) => {
              return {
                ...coin,
                ...data[coin.id],
                usd: Number(
                  Math.round(Number(data[coin.id].usd + 'e2')) + 'e-2'
                ),
                btc: Math.floor(data[coin.id].btc * 100000000),
                usd_24h_change: Number(
                  Math.round(Number(data[coin.id].usd_24h_change + 'e2')) +
                    'e-2'
                ),
              };
            })
            .sort((a, b) => b.usd_market_cap - a.usd_market_cap)
        );
      } else if (activeDataSource === 'CoinMarketCap' && !isLoading) {
        setCoinsData(
          Object.values(data)
            .filter((coin: any) => {
              return cmcCoinIds.some((id) => id === coin.id);
            })
            .map((coin: any) => {
              return {
                ...coin,
                usd: Number(
                  Math.round(Number(coin.quote.USD.price + 'e2')) + 'e-2'
                ),
                usd_24h_change: Number(
                  Math.round(Number(coin.quote.USD.percent_change_24h + 'e2')) +
                    'e-2'
                ),
                usd_market_cap: coin.quote.USD.market_cap,
              };
            })
            .sort((a, b) => b.usd_market_cap - a.usd_market_cap)
        );
      }
    }
  }, [isLoading, activeDataSource, data]);

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
