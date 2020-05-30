import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sorter from './Sorter';
import Row from './Row';

import { media } from './GlobalStyle.css';

const StyledTable = styled.table`
  box-shadow: 0 2px 27px 7px rgba(3,169,245,0.13);
  width: 80%;
  max-width: 720px;
  margin: 0 auto 80px auto;
  border-collapse: collapse;
  border-radius: 10px;
  box-sizing: border-box;
  
  ${media.m`
    width: 90%;
    font-size: 14px;
  `}

  tr {
    height: 50px;
    ${media.m`height: 46px;`}
    line-height: 0;
  }

  th, td {
    text-align: left;
    padding: 0 0 0 30px;
    border: 1px solid rgba(255,107,0,0.1);
    line-height: 16.1px;

    ${media.m`
      padding: 0 12px;
    `}
    
    &:last-child {
      width: 25%;
      border-right: none;
    }

    &:first-child {
      border-left: none;
    }
  }

  th {
    border-top: none;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const HeaderCell = styled.th`
  color: #65748e;
  font-size: 24px;
  font-weight: 800;
  height: 65px;
  ${media.m`height: 60px;`}
  ${media.l`font-size: 20px;`}
  ${media.m`font-size: 18px;`}
  ${media.s`font-size: 16px;`}

  &:first-child {
    color: #FF6B00;
  }

  &:last-child {
    position: relative;
  }
`;

const PriceTable_Tbody = styled.tbody`
  tr:nth-child(odd) {
    background: #f7feff;
  }
`;

const Table = ({ coinsInfo, data, isLoading }) => {
  const [coinsData, setCoinsData] = useState(isLoading ? [] : coinsInfo.map(coin => {
    return {
      ...coin,
      ...data[coin.id],
      usd: Number(Math.round(data[coin.id].usd+'e2')+'e-2'),
      btc: Math.floor(data[coin.id].btc * 100000000),
      usd_24h_change: Number(Math.round(data[coin.id].usd_24h_change+'e2')+'e-2')
    }
  }).sort((a, b) => b.usd_market_cap - a.usd_market_cap));
  const [lastSortOption, setLastSortOption] = useState('default');

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setCoinsData(coinsInfo.map(coin => {
        return {
          ...coin,
          ...data[coin.id],
          usd: Number(Math.round(data[coin.id].usd+'e2')+'e-2'),
          btc: Math.floor(data[coin.id].btc * 100000000),
          usd_24h_change: Number(Math.round(data[coin.id].usd_24h_change+'e2')+'e-2')
        }
      }).sort((a, b) => b.usd_market_cap - a.usd_market_cap))
    }    
  }, [data]);

  const handleSortChange = (sortOption) => {
    if (sortOption === 'highToLow') {
      setCoinsData(coinsData => {
        return coinsData.sort((a, b) => b.usd_24h_change - a.usd_24h_change)
      });
      setLastSortOption('highToLow');
    } else if (sortOption === 'lowToHigh') {
      setCoinsData(coinsData => {
        return coinsData.sort((a, b) => a.usd_24h_change - b.usd_24h_change)
      });
      setLastSortOption('lowToHigh');
    } else if (sortOption === 'default') {
      setCoinsData(coinsData => {
        return coinsData.sort((a, b) => b.usd_market_cap - a.usd_market_cap)
      });
      setLastSortOption('default');
    };
  };

  const handleSortClick = () => {
    if (lastSortOption === 'default') {
      handleSortChange('highToLow');
    } else if (lastSortOption === 'highToLow') {
      handleSortChange('lowToHigh');
    } else if (lastSortOption === 'lowToHigh') {
      handleSortChange('default');
    }
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Price</HeaderCell>
          <HeaderCell 
            onClick={handleSortClick} 
            style={{
              userSelect:'none',
              cursor: 'pointer'
            }}>
            Change<Sorter lastSortOption={lastSortOption} />
          </HeaderCell>
        </tr>
      </thead>
      <PriceTable_Tbody>
        {
          !isLoading 
          ? coinsData.map(coin => (
            <Row 
              key={`CoinRow-${coin.id}`}
              isLoading={isLoading}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              priceUsd={coin.usd}
              priceBtc={coin.btc}
              priceChange={coin.usd_24h_change}
            />
          ))
          : coinsInfo.map(({ id }) => (
            <Row 
              key={`CoinRow-${id}`}
              isLoading={isLoading}
            />
          ))
        }
      </PriceTable_Tbody>
    </StyledTable>
  );
}

export default Table;