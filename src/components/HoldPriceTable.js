import React from 'react';

export default class HoldPriceTable extends React.Component {
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
    this.props.view("hold");
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
          <tr>
            <td>Bitcoin (BTC)</td>
            <td>$10382</td>
            <td className="pc">3</td>
          </tr>
          <tr>
            <td>Nuls (NULS)</td>
            <td>$3.84 / 38012</td>
            <td className="pc">8</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
