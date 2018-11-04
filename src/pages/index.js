import React from 'react';
import Layout from '../components/Layout';
import PriceTable from '../components/PriceTable';

const IndexPage = () => (
  <Layout>
    <PriceTable view="hold" />
  </Layout>
);

export default IndexPage;