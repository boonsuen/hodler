import React from 'react';
import ReactDOM from 'react-dom';

class HodlerApp extends React.Component {
  render() {
    return (
      <div>Hello world</div>
    );
  }
}
ReactDOM.render(<HodlerApp />, document.getElementById('app'));