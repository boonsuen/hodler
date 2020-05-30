import { useContext } from 'react';
import Table from '../components/Table';

import { CoinsDataContext, watchingCoinsInfo } from './_app';

const Watch = () => {
  const { data, isLoading } = useContext(CoinsDataContext);

  return (
    <Table 
      coinsInfo={watchingCoinsInfo}
      data={data}
      isLoading={isLoading}
    />
  );
};

export default Watch;