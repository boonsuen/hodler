import React from 'react';

const CoinRow = (props) => {
  let className = 'pc';
  if (props.priceChange > 0) {
    className += ' pc--green';
  } else if (props.priceChange < 0) {
    className += ' pc--red';
  }
  return (
    <tr>
      <td>{props.name}</td>
      <td>${props.priceUsd} / {props.priceSats}</td>
      <td className={className}>{props.priceChange}</td>
    </tr>
  )
};

export default CoinRow;
