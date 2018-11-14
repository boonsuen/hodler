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
    axios.get('https://hodler-api-goqmromzaq.now.sh')
      .then(res => {
        this.setState({
          coinsData: res.data.data,
          coinsDataLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });  
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Hodler</title>
          <link rel="icon" href={img_favicon} />
          <style>
          {`
            @font-face {
              font-family: "Avenir Next";
              src: url('/fonts/AvenirNextLTPro-Regular-subset.woff2') format('woff2'),
                  url('/fonts/AvenirNextLTPro-Regular-subset.woff') format('woff');
              font-weight: 400;
            }

            @font-face {
              font-family: "Avenir Next";
              src: url('/fonts/AvenirNextLTPro-Medium-subset.woff2') format('woff2'),
                  url('/fonts/AvenirNextLTPro-Medium-subset.woff') format('woff');
              font-weight: 500;
            }

            @font-face {
              font-family: "Avenir Next";
              src: url('/fonts/AvenirNextLTPro-Demi-subset.woff2') format('woff2'),
                  url('/fonts/AvenirNextLTPro-Demi-subset.woff') format('woff');
              font-weight: 600;
            }

            @font-face {
              font-family: "Avenir Next";
              src: url('/fonts/AvenirNextLTPro-Bold-subset.woff2') format('woff2'),
                  url('/fonts/AvenirNextLTPro-Bold-subset.woff') format('woff');
              font-weight: 700;
            }
          `}
          </style>
        </Head>
        <GlobalStyle />        
        <Router>
          <React.Fragment>
            <Header />
            <Switch />
            <CoinsDataContext.Provider value={this.state}>
              <Routes />
            </CoinsDataContext.Provider>
          </React.Fragment>
        </Router>        
      </React.Fragment>
    );
  }
}