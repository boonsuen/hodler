import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { DataSource } from '@/types';
import { Manrope } from 'next/font/google';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { getCoinGeckoData, getCoinMarketCapData } from '@/services';
import { CoinsDataContext } from '@/context/CoinsDataContext';
import { COLORS } from '@/configs';
import { ThemeProvider } from '@/context/ThemeContext';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

function App({ Component, pageProps }: AppProps) {
  const [activeDataSource, setActiveDataSource] =
    useState<DataSource>('CoinGecko');

  const coinsDataQuery = useQuery({
    queryKey: ['coinsData', activeDataSource],
    queryFn: async () => {
      if (activeDataSource === 'CoinGecko') {
        return (await getCoinGeckoData()).data;
      } else {
        return (await getCoinMarketCapData()).data.data;
      }
    },
  });

  return (
    <>
      <Head>
        <title>Hodler</title>
        <link rel="icon" href="/img/logo.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
      <CoinsDataContext.Provider
        value={{
          data: coinsDataQuery.data,
          isLoading: coinsDataQuery.isLoading,
          activeDataSource,
          setActiveDataSource,
        }}
      >
        <ThemeProvider>
          <main className={`${manrope.variable} font-sans antialiased`}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </ThemeProvider>
      </CoinsDataContext.Provider>
    </>
  );
}

const queryClient = new QueryClient();

export default function ({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <App Component={Component} {...pageProps} />
    </QueryClientProvider>
  );
}
