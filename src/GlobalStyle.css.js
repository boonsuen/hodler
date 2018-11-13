import { createGlobalStyle } from 'styled-components';

import AvenirNextRegularSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Regular-subset.woff2';
import AvenirNextRegularSubsetWoff from './assets/fonts/AvenirNextLTPro-Regular-subset.woff';

import AvenirNextMediumSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Medium-subset.woff2';
import AvenirNextMediumSubsetWoff from './assets/fonts/AvenirNextLTPro-Medium-subset.woff';

import AvenirNextDemiSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Demi-subset.woff2';
import AvenirNextDemiSubsetWoff from './assets/fonts/AvenirNextLTPro-Demi-subset.woff';

import AvenirNextBoldSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Bold-subset.woff2';
import AvenirNextBoldSubsetWoff from './assets/fonts/AvenirNextLTPro-Bold-subset.woff';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextRegularSubsetWoff2}) format('woff2'),
        url(${AvenirNextRegularSubsetWoff}) format('woff');
    font-weight: 400;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextMediumSubsetWoff2}) format('woff2'),
        url(${AvenirNextMediumSubsetWoff}) format('woff');
    font-weight: 500;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextDemiSubsetWoff2}) format('woff2'),
        url(${AvenirNextDemiSubsetWoff}) format('woff');
    font-weight: 600;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextBoldSubsetWoff2}) format('woff2'),
        url(${AvenirNextBoldSubsetWoff}) format('woff');
    font-weight: 700;
  }

  body {
    font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif;
    font-weight: 500;
  }
  
  a {
    text-decoration: none;
  }
  
tr {
  height: 50px;
}

th, td {
  text-align: left;
  padding: 0 0 0 30px;
  border: 1px solid rgba(255,107,0,0.1);
}

th {
  height: 65px;
  border-top: none;
}

th:first-child, td:first-child {
  border-left: none;
}

th:last-child, td:last-child {
  border-right: none;
}


tr:last-child td {
  border-bottom: none;
}

tr:nth-child(odd):not(.row-head) {
  background: #f7feff;
}

.name, .price, .change {
  color: #65748e;
  font-size: 26px;
  font-weight: 700;
}

.name {
  color: #FF6B00;
}

.change {
  position: relative;
}

.sorter {
  position: absolute;
  right: 24px;
  top: 18px;
  width: 15px;
  margin-left: 10px;
}

.sorter__up, .sorter__down {
  fill: #A0C2F9;
  cursor: pointer;
}
.sorter__up:hover, .sorter__down:hover {
  fill: #5892E8;
}

.change, td:last-child {
  width: 25%;
}

.pc--green {
  color: #4ae264;
}

.pc--red {
  color: #ff8282;
}

.svg-tr {
  line-height: 0;
}
`;

export default GlobalStyle;