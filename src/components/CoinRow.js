import React from 'react';

const CoinRow = (props) => {
  let className = 'pc';
  if (props.priceChange > 0) {
    className += ' pc--green';
  } else if (props.priceChange < 0) {
    className += ' pc--red';
  }
  const priceSats = Math.floor(props.priceSats * 100000000);
  return (
    <tr>
      <td>{props.name} ({props.symbol})</td>
      <td>${props.name === 'Bitcoin' ? props.priceUsd : `${props.priceUsd} / ${priceSats}`}</td>
      <td className={className}>{props.priceChange}</td>
    </tr>
  );
};

export default CoinRow;
