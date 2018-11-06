import React from 'react';
import { Link } from 'react-static';
import styled from 'styled-components';

const StyledSwitch = styled.div`
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

const NavLink = styled(Link).attrs({
    activeClassName: 'Switch__NavLink-active'
})`
  color: #EE732F;
  border: 1px solid #EE732F;
  transition: all .2s;

  &:hover {
    background-color: rgba(255,107,0,0.1);    
  }

  &.Switch__NavLink-active {
    background-color: #EE732F;
    color: #fff;
  }
`;

const Switch = () => (
  <StyledSwitch>
    <NavLink to="/" exact>Holding</NavLink>
    <NavLink to="/watch">Watching</NavLink>
  </StyledSwitch>
);

export default Switch;