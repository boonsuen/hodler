import React from 'react';
import axios from 'axios';
import CoinRow from './CoinRow';

export default class HoldPriceTable extends React.Component {
  state = {
    coinsData: [],
    coinsId: {
      bitcoin: 1, nuls: 2092,
      'power-ledger': 2132, wabi: 2267
    },
    coinsId2: [
      1, 2092,
      2132, 2267
    ],
    coinsDataLoaded: false
  };
  componentDidMount() {
    this.props.state("hold", true);
  }
  componentDidUpdate() {
    const stateCoinsDataLength = this.state.coinsData.length;
    const propsCoinsDataLength = Object.keys(this.props.coinsData).length;
    console.log('stateCoinsDataLength', stateCoinsDataLength);
    console.log('propsCoinsDataLength', propsCoinsDataLength);
    if (stateCoinsDataLength < 4 && propsCoinsDataLength === 300) {
      let filteredCoinsData = [];
      this.state.coinsId2.map((id) => {
        const matchedCoinData = this.props.coinsData[id];
        filteredCoinsData.push(matchedCoinData);
      });
      this.setState(() => ({
        coinsData: filteredCoinsData,
        coinsDataLoaded: true
      }));
    }
  }
  handleSortChange = (e) => {
    if (e.target.className.baseVal === 'sorter__up') {
      const sortedCoinsData = this.state.coinsData;
      sortedCoinsData.map((obj) => {
        obj.quotes.USD.percent_change_24h = Number(obj.quotes.USD.percent_change_24h);
      });
      sortedCoinsData.sort((a, b) => b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h);
      this.setState(() => ({
        coinsData: sortedCoinsData
      }));
    } else if (e.target.className.baseVal === 'sorter__down') {
      const sortedCoinsData = [...this.state.coinsData];
      sortedCoinsData.map((obj) => {
        obj.quotes.USD.percent_change_24h = Number(obj.quotes.USD.percent_change_24h);
      });
      sortedCoinsData.sort((a, b) => a.quotes.USD.percent_change_24h - b.quotes.USD.percent_change_24h);
      this.setState(() => ({
        coinsData: sortedCoinsData
      }));
    };
  };
  render() {
    return (
      <table className="price-table">
        <thead>
          <tr className="row-head">
            <th className="name">Name</th>
            <th className="price">Price</th>
            <th className="change">
              Change
              <svg className="sorter" version="1.1" x="0px" y="0px"
                viewBox="0 0 194.2 348.7" space="preserve">
                <path
                  className="sorter__up"
                  onClick={this.handleSortChange}
                  d="M86.2,5.6l-83.8,118c-6.3,8.8,0,21,10.9,21h167.5c10.8,0,17.1-12.2,10.9-21L108,5.6
                  C102.7-1.9,91.6-1.9,86.2,5.6z"/>
                <path
                  className="sorter__down"
                  onClick={this.handleSortChange}
                  d="M108,343.1l83.8-118c6.3-8.8,0-21-10.9-21H13.3c-10.8,0-17.1,12.2-10.9,21l83.8,118
                  C91.6,350.5,102.7,350.5,108,343.1z"/>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
        {
					this.state.coinsDataLoaded
          ? this.state.coinsData.map((coin, index) => (
  						<CoinRow
  							key={index}
  							name={coin.name}
  							symbol={coin.symbol}
  							priceUsd={coin.quotes.USD.price}
  							priceSats={coin.quotes.BTC.price}
                priceChange={coin.quotes.USD.percent_change_24h}
                coinsDataLoaded={this.state.coinsDataLoaded}
  						/>
  					))
          : this.state.coinsId2.map((id, index) => (
              <CoinRow
                key={index}
                coinsDataLoaded={this.state.coinsDataLoaded}
              />
            ))
				}
        </tbody>
      </table>
    );
  }
}
