import React from 'react';
import PriceTable from '../components/PriceTable';

const Home = () => {
  return (
    <PriceTable 
      coinsToRender={[1, 2092, 2132, 1697]}
    />
  )
};

export default Home;