import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Switch = styled.div`
  margin: 0 auto 30px auto;
  display: flex;
  width: 199px;
  justify-content: center;
  
  a {
    height: 45px;
    cursor: pointer;
    text-align: center;
    line-height: 45px;
    width: 100px;
    box-sizing: border-box;
  }
`;

const StyledLink = styled(({ isActive, children, ...rest }) => (
  <Link {...rest}>{children}</Link>
))`
  background-color: ${props => props.isActive ? "#EE732F" : "none"};
  color: ${props => props.isActive ? "#fff" : "#EE732F"};
  border: 1px solid #EE732F;
  transition: all .2s;

  &:hover {
    background-color: ${props => !props.isActive && "rgba(255,107,0,0.1)"};
    color: ${props => !props.isActive && "#EE732F"};
  }
`;

class StyledSwitch extends React.Component {
  getSelectedLink = () => {
    if (typeof window !== `undefined`) {
      if (window.location.pathname === '/') {
        return 'hold'
      } else if (window.location.pathname === '/watch' || window.location.pathname === '/watch/') {
        return 'watch'
      } 
    }    
  }
  state = {
    selectedLink: this.getSelectedLink()
  }
  isActive = (selectedLink) => this.state.selectedLink === selectedLink;
  handleSwitch = (selectedLink) => {
    this.setState({selectedLink});
  }
  render() {
    return (
      <Switch>
        <StyledLink 
          isActive={this.isActive('hold')}       
          onClick={() => {
            this.handleSwitch('hold')
          }}  
          to="/">Holding</StyledLink>
        <StyledLink 
          isActive={this.isActive('watch')}
          onClick={() => {
            console.log('yo')
            this.handleSwitch('watch')
          }} 
          to="/watch">Watching</StyledLink>
      </Switch>
    );
  }
}

export default StyledSwitch;