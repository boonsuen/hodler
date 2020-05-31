import { useContext } from 'react';
import Head from 'next/head';
import Table from '../components/Table';

import { CoinsDataContext, mainCoinsInfo } from './_app';

const Index = () => {
  const { data, isLoading } = useContext(CoinsDataContext);

  return (
    <>
      <Head>
        <meta name="description" content="A simple crypto price viewer" />
      </Head>
      <Table 
        coinsInfo={mainCoinsInfo}
        data={data}
        isLoading={isLoading}
      />
    </>
  );
};

export default Index;