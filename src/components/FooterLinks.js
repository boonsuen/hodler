import styled from 'styled-components';

import img_github from '../assets/img/github.svg';
import img_twitter from '../assets/img/twitter.svg';

import { media } from './GlobalStyle.css';

const StyledFooterLinks = styled.div`
  width: 80%;
  ${media.m`width: 90%;`}
  max-width: 720px;
  margin: 0 auto 80px auto;
`;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 223px;
`;

const Link = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 103px;
  height: 40px;
  background-color: #FFF0E8;
  border-radius: 5px;
  color: #000;
  font-size: 13px;

  img {
    width: 20px;
    margin-right: 8px;
  }
`;

const FooterLinks = () => (
  <StyledFooterLinks>
    <LinksWrapper>
      <Link href="https://github.com/boonsuen/hodler" target="_blank" rel="noopener">
        <img src={img_github} alt="GitHub" />
        <span>GitHub</span>
      </Link>
      <Link href="https://twitter.com/_wnxn" target="_blank" rel="noopener">
        <img src={img_twitter} alt="Twitter" />
        <span>Twitter</span>
      </Link>
    </LinksWrapper>      
  </StyledFooterLinks>
);

export default FooterLinks;