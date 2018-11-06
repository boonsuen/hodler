import React from 'react';
import styled from 'styled-components';
import CoinRow from './CoinRow';

import { CoinsDataContext } from '../App';

const StyledPriceTable = styled.table`
  box-shadow: 0 2px 27px 7px rgba(3,169,245,0.13);
  width: 80%;
  max-width: 720px;
  margin: 0 auto 80px auto;
  border-collapse: collapse;
  border-radius: 10px;
  box-sizing: border-box;
`;

export default class PriceTable extends React.Component {
  state = {
    coinsData: []
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
    const { coinsToRender } = this.props;
    return (
      <StyledPriceTable>
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
          <CoinsDataContext.Consumer>
            {({ data, loaded }) => {
              if (loaded) {
                const filteredCoinsData = data.filter(coin => {
                  return coinsToRender.some(e => e.id === coin.id);
                });
                console.log(filteredCoinsData);
                return filteredCoinsData.map((coin, index) => (
                  <CoinRow
                    key={`CoinRow-${coin.symbol}`}
                    name={coin.name}
                    symbol={coin.symbol.toUpperCase()}
                    priceUsd={coin.current_price}
                    priceSats={coin.current_price}
                    priceChange={coin.price_change_24h}
                    coinsDataLoaded={loaded}
                  />
                ))
              } else {
                return coinsToRender.map(coin => (
                  <CoinRow 
                    key={`CoinRow-${coin.id}`}
                    coinsDataLoaded={loaded}
                  />
                ))     
              }    
            }}
          </CoinsDataContext.Consumer>
        </tbody>
      </StyledPriceTable>
    )
  }
}

