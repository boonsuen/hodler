import React from 'react';
import { BrowserRouter, Route, Switch as RouteSwitch} from 'react-router-dom';
import Switch from './Switch';
import HoldPriceTable from './HoldPriceTable';
import WatchPriceTable from './WatchPriceTable';

export default class HodlerApp extends React.Component {
  state = {
    view: null
  };
  setView = (view) => {
    this.setState(() => ({view}));
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch />
          <RouteSwitch>
            <Route path="/" render={() => <HoldPriceTable view={this.setView} />} exact={true} />
            <Route path="/watch" component={WatchPriceTable} />
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
