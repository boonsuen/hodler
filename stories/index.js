import React from 'react';
import { storiesOf } from '@storybook/react';

import CoinRow from '../src/components/CoinRow';

storiesOf('CoinRow', module)
  .add('with text', () => (
    <CoinRow
      name="Nuls"
      symbol="NULS"
      priceUsd={10}
      priceSats={1000}
      priceChange={10}
      coinsDataLoaded={true}
    />
  ))
  .add('with some emoji', () => (
    <CoinRow />
  ));
