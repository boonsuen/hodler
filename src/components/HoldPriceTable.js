import React from 'react';
import axios from 'axios';
import CoinRow from './CoinRow';

export default class HoldPriceTable extends React.Component {
  state = {
    coinsData: [],
    coinsWatchId: ['bitcoin', 'nuls', 'power-ledger', 'wabi']
  };
  componentDidMount() {
    // axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=300')
    //   .then(res => {
    //     let allCoinsData = res.data;
    //     console.log(allCoinsData);
    //     let coinsData = [];
    //     this.state.coinsWatchId.map(id => {
    //       let singleCoinData = allCoinsData.filter(coin => coin.id === id);
    //       coinsData.push(...singleCoinData);
    //     });
    //     this.setState({
    //       coinsData
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    this.props.state("hold", true);
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
