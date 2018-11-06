import React from 'react';
import { Router, Link } from "@reach/router";
import axios from 'axios';

import Switch from './Switch';
import HoldPriceTable from './HoldPriceTable';
import WatchPriceTable from './WatchPriceTable';

export default class HodlerApp extends React.Component {
  state = {
    view: null,
    tableDoneRendering: false,
    coinsData: []
  };
  componentDidMount() {
    axios.get('https://api.coinmarketcap.com/v2/ticker/?convert=BTC')
      .then(res => {
        this.setState({
          coinsData: res.data.data
        });
        console.log('FETCH 1', Object.keys(this.state.coinsData).length);
        return axios.get('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=101');
      })
      .then(res => {
        this.setState(prevState => ({
          coinsData: {...prevState.coinsData, ...res.data.data}
        }));
        console.log('FETCH 101', Object.keys(this.state.coinsData).length);
        return axios.get('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=201');
      })
      .then(res => {
        this.setState(prevState => ({
          coinsData: {...prevState.coinsData, ...res.data.data}
        }));
        console.log('FETCH 201', Object.keys(this.state.coinsData).length);
      })
      .catch(err => {
        console.log(err);
      });
    // setInterval(() => {
    //   axios.get('https://api.coinmarketcap.com/v2/ticker/')
    //     .then(res => {
    //       this.setState({
    //         coinsData: res.data.data
    //       });
    //       console.log('setInterval FETCH');
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }, 10000);
  }
  setStates = (view, tableDoneRendering) => {
    this.setState(() => ({
      view,
      tableDoneRendering
    }));
  };
  render() {
    return (
      <React.Fragment>
        {this.state.tableDoneRendering && <Switch view={this.state.view} />}
          <Router>
            <HoldPriceTable 
              path="/"
              state={this.setStates} 
              coinsData={this.state.coinsData} 
            />
            <WatchPriceTable 
              path="watch"
              state={this.setStates} 
              coinsData={this.state.coinsData} 
            />
          </Router>
      </React.Fragment>
    );
  };
}
