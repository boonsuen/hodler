import { useState, useEffect, useContext, useRef } from 'react';
import Head from 'next/head';
import Table from '../components/Table';

import { CoinsDataContext, mainCoinsInfo } from './_app';

const Index = () => {
  const { data, isLoading, isLoadingSec, activeDataSource } =
    useContext(CoinsDataContext);
  const isInitialMount = useRef(true);

  const cmcCoinIds = [1, 1839, 1765, 2010, 52, 1376, 1697, 2092];

  const prevDataRef = useRef();
  useEffect(() => {
    prevDataRef.current = data;
  });
  const prevData = prevDataRef.current;

  const coinsDataForState =
    isLoading || data === prevData
      ? []
      : activeDataSource === 'CoinGecko'
      ? mainCoinsInfo
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
          .filter((coin: { id: number }) => {
            return cmcCoinIds.some((id) => id === coin.id);
          })
          .map(
            (coin: {
              quote: {
                USD: {
                  price: number;
                  market_cap: number;
                  percent_change_24h: number;
                };
              };
            }) => {
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
            }
          )
          .sort((a, b) => b.usd_market_cap - a.usd_market_cap);

  const [coinsData, setCoinsData] = useState(coinsDataForState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (activeDataSource === 'CoinGecko' && !isLoading && isLoadingSec) {
        setCoinsData(
          mainCoinsInfo
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
            .filter((coin: { id: number }) => {
              return cmcCoinIds.some((id) => id === coin.id);
            })
            .map(
              (coin: {
                quote: {
                  USD: {
                    price: number;
                    market_cap: number;
                    percent_change_24h: number;
                  };
                };
              }) => {
                return {
                  ...coin,
                  usd: Number(
                    Math.round(Number(coin.quote.USD.price + 'e2')) + 'e-2'
                  ),
                  usd_24h_change: Number(
                    Math.round(
                      Number(coin.quote.USD.percent_change_24h + 'e2')
                    ) + 'e-2'
                  ),
                  usd_market_cap: coin.quote.USD.market_cap,
                };
              }
            )
            .sort((a, b) => b.usd_market_cap - a.usd_market_cap)
        );
      }
    }
  }, [isLoading, isLoadingSec, activeDataSource, data]);

  return (
    <>
      <Head>
        <meta name="description" content="A simple crypto price viewer" />
      </Head>
      <Table
        data={coinsData}
        setData={setCoinsData}
        isLoading={isLoading}
        rowLength={mainCoinsInfo.length}
        activeDataSource={activeDataSource}
      />
    </>
  );
};

export default Index;
