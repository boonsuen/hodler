import React, { Children } from 'react'
import styled from 'styled-components';
import { useRouter } from 'next/router'
import Link from 'next/link'

import { media } from './GlobalStyle.css';

const StyledSwitch = styled.div`
  margin: 0 auto 30px auto;
  display: flex;
  width: 199px;
  justify-content: center;
  ${media['s']`width: 180px;`}
  
  a {
    height: 45px;
    cursor: pointer;
    text-align: center;
    line-height: 45px;
    width: 100px;
    box-sizing: border-box;
    ${media['s']`
    height: 45px;
    font-size: 14px;`}
  }
`;

const NavLink = styled.a`
  color: var(--color-navlink);
  border: 1px solid var(--color-navlink);
  background-color: var(--bg-navlink-inactive);
  transition: all .2s;

  &:hover {
    background-color: var(--bg-navlink-hover);    
  }

  &.Switch__NavLink-active {
    background-color: var(--color-navlink);
    color: #fff;
  }
`;

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const router = useRouter()
  const child = Children.only(children)
  let childClassName = child.props.className || ''

  if (router.pathname === props.href) {
    childClassName = `${childClassName} Switch__NavLink-active`
  }

  const className =
    asPath === `${process.env.BASE}${props.href}`
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link href={props.href} passHref={props.passHref}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
}

const Switch = () => (
  <StyledSwitch>
    <ActiveLink activeClassName="Switch__NavLink-active" href="/" passHref><NavLink>Main</NavLink></ActiveLink>
    <ActiveLink activeClassName="Switch__NavLink-active" href="/watch" passHref><NavLink>Watching</NavLink></ActiveLink>  
  </StyledSwitch>
);

export default Switch;