import React from 'react';
import axios from 'axios';
import CoinRow from './CoinRow';

export default class WatchPriceTable extends React.Component {
  state = {
    coinsData: [],
    coinsWatchId: [
      'ethereum', 'ripple',
      'iota', 'cardano',
      'litecoin', 'omisego',
      'icon', 'ardor',
      'raiden-network-token', 'monaco',
      'substratum', 'ethlend'
    ]
  };
  componentDidMount() {
    this.props.state("watch", true);
  }
  componentDidUpdate() {
    if (this.state.coinsData.length === 0 && this.props.coinsData.length > 0) {
      let filteredCoinsData = [];
      this.state.coinsWatchId.map(id => {
        let singleCoinData = this.props.coinsData.filter(coin => coin.id === id);
        filteredCoinsData.push(...singleCoinData);
      });
      this.setState(() => ({
        coinsData: filteredCoinsData
      }));
    }
  }
  render() {
    return (
      <table className="price-table">
        <thead>
          <tr className="row-head">
            <th className="name">Name</th>
            <th className="price">Price</th>
            <th className="change">Change</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.coinsData.map((coin, index) => (
            <CoinRow
              key={index}
              name={coin.name}
              symbol={coin.symbol}
              priceUsd={coin.price_usd}
              priceSats={coin.price_btc}
              priceChange={coin.percent_change_24h}
            />
          ))
        }
        </tbody>
      </table>
    );
  }
}
