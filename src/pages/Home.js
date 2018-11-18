import React from 'react';
import { Head } from 'react-static';
import PriceTable from '../components/PriceTable';

const Home = () => (
  <React.Fragment>
    <Head>
      <meta name="Description" content="Simple crypto price viewer" />
    </Head>
    <PriceTable 
      coinsToRender={[1, 2092, 2132, 1697]}
    />
  </React.Fragment>
  
);

export default Home;