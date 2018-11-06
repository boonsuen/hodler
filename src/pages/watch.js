import React from 'react';
import PriceTable from '../components/PriceTable';

const Watch = () => (
  <PriceTable 
    coinsToRender={[{
      id: 'ethereum',
      name: 'Ethereum'
    }, {
      id: 'ripple',
      name: 'Ripple'
    }, {
      id: 'iota',
      name: 'IOTA'
    }, {
      id: 'cardono',
      name: 'Cardano'
    }, {
      id: 'litecoin',
      name: 'Litecoin'
    }, {
      id: 'omisego', 
      name: 'OmiseGO'
    }, {
      id: 'icon',
      name: 'ICON'
    }, {
      id: 'ardor',
      name: 'Ardor',
    }, {
      id: 'monaco',
      name: 'Monaco'
    }, {
      id: 'substratum',
      name: 'Substratum'
    }, {
      id: 'ethlend',
      name: 'ETHLend'
    }]}
  />
);

export default Watch;

