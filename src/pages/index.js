import { useContext } from 'react';
import Table from '../components/Table';

import { CoinsDataContext, mainCoinsInfo } from './_app';

const Index = () => {
  const { data, isLoading } = useContext(CoinsDataContext);

  return (
    <Table 
      coinsInfo={mainCoinsInfo}
      data={data}
      isLoading={isLoading}
    />
  );
};

export default Index;