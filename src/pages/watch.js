import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/Layout';
import PriceTable from '../components/PriceTable';

const WatchPage = () => (
  <Layout>
    <Router>
      <PriceTable path="/watch" view="watch" />
    </Router>
  </Layout>
);

export default WatchPage;

