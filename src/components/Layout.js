import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Switch from './Switch';
import axios from 'axios';
import GlobalStyle from './GlobalStyle.css';

import img_favicon from '../assets/img/favicon.png';

class Layout extends React.Component {
  state = {
    coinsData: []
  };
  componentDidMount() {
    // axios.get('https://api.coinmarketcap.com/v2/ticker/?convert=BTC')
    //   .then(res => {
    //     this.setState({
    //       coinsData: res.data.data
    //     });
    //     console.log('FETCH 1', Object.keys(this.state.coinsData).length);
    //     return axios.get('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=101');
    //   })
    //   .then(res => {
    //     this.setState(prevState => ({
    //       coinsData: {...prevState.coinsData, ...res.data.data}
    //     }));
    //     console.log('FETCH 101', Object.keys(this.state.coinsData).length);
    //     return axios.get('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=201');
    //   })
    //   .then(res => {
    //     this.setState(prevState => ({
    //       coinsData: {...prevState.coinsData, ...res.data.data}
    //     }));
    //     console.log('FETCH 201', Object.keys(this.state.coinsData).length);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Hodler</title>
          <link rel="icon" href={img_favicon} />
        </Helmet>
        <Header />
        <GlobalStyle />
        <Switch view={this.state.view} />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Layout;