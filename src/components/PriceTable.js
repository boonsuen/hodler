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

const StyledSorter = styled.svg`
  position: absolute;
  right: 24px;
  top: 18px;
  width: 15px;
  margin-left: 10px;
`;

const SorterArrow = styled.path`
  fill: #A0C2F9;
  cursor: pointer;

  &:hover {
    fill: #5892E8;
  }
`;

const Sorter = ({ handleSortChange }) => (
  <StyledSorter version="1.1" x="0px" y="0px"
    viewBox="0 0 194.2 348.7" space="preserve">
    <SorterArrow
      onClick={() => {handleSortChange('up')}}
      d="M86.2,5.6l-83.8,118c-6.3,8.8,0,21,10.9,21h167.5c10.8,0,17.1-12.2,10.9-21L108,5.6
      C102.7-1.9,91.6-1.9,86.2,5.6z" />
    <SorterArrow
      onClick={() => {handleSortChange('down')}}
      d="M108,343.1l83.8-118c6.3-8.8,0-21-10.9-21H13.3c-10.8,0-17.1,12.2-10.9,21l83.8,118
      C91.6,350.5,102.7,350.5,108,343.1z" />
  </StyledSorter>
);

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
          <tr className="row-head">
            <th className="name">Name</th>
            <th className="price">Price</th>
            <th className="change">
              Change
              <Sorter handleSortChange={this.handleSortChange} />
            </th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </StyledPriceTable>
    )
  }
}

export default props => (
  <CoinsDataContext.Consumer>
    {({ coinsData: data, coinsDataLoaded: loaded }) => {
      return (
        <PriceTable 
          loaded={loaded} 
          coinsToRender={props.coinsToRender} 
          data={data} 
          {...props} 
        />
      )
    }}
  </CoinsDataContext.Consumer>
);