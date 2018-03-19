import React from 'react';

const CoinRow = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.priceUsd}</td>
    <td className="pc">{props.priceSats}</td>
  </tr>
);

export default CoinRow;
