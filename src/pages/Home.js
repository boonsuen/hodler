import React from 'react';
import PriceTable from '../components/PriceTable';

const Home = () => {
  return (
    <PriceTable 
      coinsToRender={[{
        id: 'bitcoin',
        name: 'Bitcoin'
      }, {
        id: 'nuls',
        name: 'Nuls',
      }, {
        id: 'power-ledger',
        name: 'Power Ledger'
      }, {
        id: 'basic-attention-token',
        name: 'Basic Attention Token'
      }]}
    />
  )
};

export default Home;