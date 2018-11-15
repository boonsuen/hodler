import React from 'react';
import styled from 'styled-components';
import CoinRow from './CoinRow';
import Sorter from './Sorter';

import { CoinsDataContext } from '../App';

const StyledPriceTable = styled.table`
  box-shadow: 0 2px 27px 7px rgba(3,169,245,0.13);
  width: 80%;
  max-width: 720px;
  margin: 0 auto 80px auto;
  border-collapse: collapse;
  border-radius: 10px;
  box-sizing: border-box;

  tr {
    height: 50px;
    line-height: 0;
  }

  th {
    height: 65px;
    border-top: none;
  }

  th, td {
    text-align: left;
    padding: 0 0 0 30px;
    border: 1px solid rgba(255,107,0,0.1);
    
    &:last-child {
      width: 25%;
      border-right: none;
    }

    &:first-child {
      border-left: none;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const PriceTable_Tbody = styled.tbody`
  tr:nth-child(odd) {
    background: #f7feff;
  }
`;

class PriceTable extends React.Component {
  state = {
    coinsData: this.props.loaded ? Object.values(this.props.data).filter(coin => {
      return this.props.coinsToRender.some(id => id === coin.id);
    }) : []
  }
  getCoinsData = () => Object.values(this.props.data).filter(coin => {
    return this.props.coinsToRender.some(id => id === coin.id);
  })
  componentDidMount() {
    this.handleSortChange();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {    
    console.log(this.getCoinsData());
    if (Object.keys(this.props.data).length > Object.keys(prevProps.data).length) {
      this.setState({
        coinsData: Object.values(this.props.data).filter(coin => {
          return this.props.coinsToRender.some(id => id === coin.id);
        })
      });
    }
  }
  handleSortChange = (rule) => {
    if (rule === 'up') {
      this.setState(state => ({
        coinsData: state.coinsData.sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h)
      }));
    } else if (rule === 'down') {
      this.setState(state => ({
        coinsData: state.coinsData.sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h)
      }));
    };
  };
  render() {
    const { coinsToRender, loaded } = this.props;
    return (
      <StyledPriceTable>
        <thead>
          <tr>
            <th className="name">Name</th>
            <th className="price">Price</th>
            <th className="change">
              Change
              <Sorter handleSortChange={this.handleSortChange} />
            </th>
          </tr>
        </thead>
        <PriceTable_Tbody>
          {
            this.props.loaded 
            ? this.state.coinsData.map(coin => (
              <CoinRow 
                key={`CoinRow-${coin.id}`}
                coinsDataLoaded={loaded}
                name={coin.name}
                symbol={coin.symbol}
                priceUsd={coin.quote.USD.price}
                priceChange={coin.quote.USD.percent_change_24h}
              />
            ))
            : coinsToRender.map(id => (
              <CoinRow 
                key={`CoinRow-${id}`}
                coinsDataLoaded={loaded}
              />
            ))
          }
        </PriceTable_Tbody>
      </StyledPriceTable>
    )
  }
}

export default props => (
  <CoinsDataContext.Consumer>
    {({ coinsData, coinsDataLoaded }) => {
      return (
        <PriceTable 
          data={coinsData} 
          loaded={coinsDataLoaded} 
          coinsToRender={props.coinsToRender} 
          {...props} 
        />
      )
    }}
  </CoinsDataContext.Consumer>
);