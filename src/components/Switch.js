import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Switch extends React.Component {
  state = {
    classNames: {
      hold: 'active hold',
      watch: 'inactive watch'
    }
  };
  componentDidMount() {
    console.log(this.props.view);
    // if (this.props.view === 'hold') {
    //   this.setState(() => ({
    //     classNames: {
    //       hold: 'active hold',
    //       watch: 'inactive watch'
    //     }
    //   }))
    // } else if (this.props.view === 'watch') {
    //   this.setState(() => ({
    //     classNames: {
    //       hold: 'inactive hold',
    //       watch: 'active watch'
    //     }
    //   }));
    // }
  }
  handleSwitch = (e) => {
    const classNames = e.target.className.split(' ');
    const notMatched = !classNames.find(elem => elem === this.props.view);
    if (this.props.view === 'hold' && notMatched) {
      this.setState(() => ({
        classNames: {
          hold: 'inactive hold',
          watch: 'active watch'
        }
      }));
    } else if (this.props.view === 'watch' && notMatched) {
      this.setState(() => ({
        classNames: {
          hold: 'active hold',
          watch: 'inactive watch'
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
