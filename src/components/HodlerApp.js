import React from 'react';
import { BrowserRouter, Route, Switch as RouteSwitch} from 'react-router-dom';
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
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=300')
      .then(res => {
        this.setState({
          coinsData: [...res.data]
        });
        console.log('axios just fetched data!', process.env);
      })
      .catch(err => {
        console.log(err);
      });
    setInterval(() => {
      axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=300')
        .then(res => {
          this.setState({
            coinsData: [...res.data]
          });
          console.log('axios just fetched data!');
        })
        .catch(err => {
          console.log(err);
        });
    }, 10000);
  }
  setStates = (view, tableDoneRendering) => {
    this.setState(() => ({
      view,
      tableDoneRendering
    }));
  };
  render() {
    return (
      <BrowserRouter basename={'/hodler-react'}>
        <div>
          {this.state.tableDoneRendering && <Switch view={this.state.view} />}
          <RouteSwitch>
            <Route path="/" render={() => <HoldPriceTable state={this.setStates} coinsData={this.state.coinsData} />} exact={true} />
            <Route path="/watch" render={() => <WatchPriceTable state={this.setStates} coinsData={this.state.coinsData} />} />
          </RouteSwitch>
        </div>
      </BrowserRouter>
    );
  };
}