import React from 'react';
import CoinRow from './CoinRow';

const coins = [{
  name: 'Etheehe',
  priceUsd: '727',
  priceSats: '72727',
  priceChange: '5'
}, {
  name: 'ripple',
  priceUsd: '100',
  priceSats: '100000',
  priceChange: '1'
}];

export default class WatchPriceTable extends React.Component {
  componentDidMount() {
    // fetch('https://api.coinmarketcap.com/v1/ticker/?limit=500')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   });
    const pcElem = document.getElementsByClassName("pc");
    for (let elem of pcElem) {
      let price = Number(elem.textContent);
      if (price > 0) {
        elem.style.color = "#4ae264";
      } else if (price < 0) {
        elem.style.color = "#ff8282";
      }
    }
    this.props.view("watch");
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
          coins.map((coin, index) => (
            <CoinRow
              key={index}
              name={coin.name}
              priceUsd={coin.priceUsd}
              priceSats={coin.priceSats}
              priceChange={coin.priceChange}
            />
          ))
        }
        </tbody>
      </table>
    );
  }
}
