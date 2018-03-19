import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Switch extends React.Component {
  state = {
    view: 'hold',
    classNames: {
      'hold': 'hold active',
      'watch': 'watch inactive'
    }
  };
  handleSwitch = (e) => {
    const classNames = e.target.className.split(' ');
    const notMatched = !classNames.find(elem => elem === this.state.view);
    if (this.state.view === 'hold' && notMatched) {
      this.setState(() => ({
        view: 'watch',
        classNames: {
          'hold': 'inactive hold',
          'watch': 'active watch'
        }
      }));
    } else if (this.state.view === 'watch' && notMatched) {
      this.setState(() => ({
        view: 'hold',
        classNames: {
          'hold': 'active hold',
          'watch': 'inactive watch'
        }
      }));
    }
  };
  render() {
    return (
      <div className="switch" onClick={this.handleSwitch}>
        <NavLink activeClassName="" className={this.state.classNames.hold} to="/" exact={true}>Holding</NavLink>
        <NavLink activeClassName="" className={this.state.classNames.watch} to="/watch">Watching</NavLink>
      </div>
    );
  }
}
