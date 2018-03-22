import React from 'react';
import { BrowserRouter, Route, Switch as RouteSwitch} from 'react-router-dom';
import Switch from './Switch';
import HoldPriceTable from './HoldPriceTable';
import WatchPriceTable from './WatchPriceTable';

export default class HodlerApp extends React.Component {
  state = {
    view: null,
    tableDoneRendering: false
  };
  setStates = (view, tableDoneRendering) => {
    this.setState(() => ({
      view,
      tableDoneRendering
    }));
  };
  componentDidMount() {
    // axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=300')
    //   .then(res => {
    //     let allCoinsData = res.data;
    //     let coinsData = [];
    //     this.state.coinsWatchId.map(id => {
    //       let singleCoinData = allCoinsData.filter(coin => coin.id === id);
    //       coinsData.push(...singleCoinData);
    //     });
    //     this.setState({
    //       coinsData
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          {this.state.tableDoneRendering && <Switch view={this.state.view} />}
          <RouteSwitch>
            <Route path="/" render={() => <HoldPriceTable state={this.setStates} />} exact={true} />
            <Route path="/watch" render={() => <WatchPriceTable state={this.setStates} />} />
            <Route path="/p" component={WatchPriceTable} />
          </RouteSwitch>
        </div>
      </BrowserRouter>
    );
  };
}

// <BrowserRouter>
//   <div>
//     <Header />
//     <Switch>
//       <Route path="/" component={ExpenseDashboardPage} exact={true} />
//       <Route path="/create" component={AddExpensePage} />
//       <Route path="/edit" component={EditExpensePage} />
//       <Route path="/help" component={HelpPage} />
//       <Route component={NotFoundPage} />
//     </Switch>
//   </div>
// </BrowserRouter>
