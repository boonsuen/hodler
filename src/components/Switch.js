import styled from 'styled-components';
import ActiveLink from './ActiveLink';

import { media } from './GlobalStyle.css';

const StyledSwitch = styled.div`
  margin: 0 auto 30px auto;
  display: flex;
  width: 199px;
  justify-content: center;
  ${media.s`width: 180px;`}
  
  a {
    height: 45px;
    cursor: pointer;
    text-align: center;
    line-height: 45px;
    width: 100px;
    box-sizing: border-box;
    ${media.s`
    height: 45px;
    font-size: 14px;`}
  }
`;

const NavLink = styled.a`
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
    <ActiveLink activeClassName="Switch__NavLink-active" href="./" passHref><NavLink>Main</NavLink></ActiveLink>
    <ActiveLink activeClassName="Switch__NavLink-active" href="./watch" passHref><NavLink>Watching</NavLink></ActiveLink>
  </StyledSwitch>
);

export default Switch;