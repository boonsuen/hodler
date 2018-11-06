import React from 'react';
import { Router, Head, Route, cleanPath } from 'react-static';
import Routes from 'react-static-routes';
import axios from 'axios';

import Header from './components/Header';
import Switch from './components/Switch';

import GlobalStyle from './GlobalStyle.css';
import img_favicon from './assets/img/favicon.png';

export const CoinsDataContext = React.createContext({  
  data: {},
  loaded: false,
});

export default class App extends React.Component {
  state = {
    coinsData: {},
    coinsDataLoaded: false
  }
  componentDidMount() {
    const coinsToFetch = [
      'bitcoin', 'nuls', 'power-ledger', 'basic-attention-token', 'ethereum', 
      'ripple', 'iota', 'cardano', 'litecoin', 'omisego', 
      'icon', 'ardor', 'monaco', 'substratum', 'ethlend'
    ];
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsToFetch.toString()}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          coinsData: res.data,
          coinsDataLoaded: true
        })
      })
      .catch(err => {
        console.log(err);
      });
    // axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinsToFetch.toString()}&tsyms=USD,BTC`)
    //   .then(res => {
    //     this.setState({
    //       coinsData: res.data.RAW,
    //       coinsDataLoaded: true
    //     });
    //   })
      // .catch(err => {
      //   console.log(err);
      // });
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Hodler</title>
          <link rel="icon" href={img_favicon} />
        </Head>
        <GlobalStyle />        
        <Router>
          <React.Fragment>
            <Header />
            <Switch />
            <CoinsDataContext.Provider value={{
              data: this.state.coinsData,
              loaded: this.state.coinsDataLoaded
            }}>
              <Routes />
            </CoinsDataContext.Provider>
          </React.Fragment>
        </Router>        
      </React.Fragment>
    );
  }
}