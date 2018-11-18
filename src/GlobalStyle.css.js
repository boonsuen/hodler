import { createGlobalStyle, css } from 'styled-components';

import AvenirNextRegularSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Regular-subset.woff2';
import AvenirNextRegularSubsetWoff from './assets/fonts/AvenirNextLTPro-Regular-subset.woff';

import AvenirNextMediumSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Medium-subset.woff2';
import AvenirNextMediumSubsetWoff from './assets/fonts/AvenirNextLTPro-Medium-subset.woff';

import AvenirNextDemiSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Demi-subset.woff2';
import AvenirNextDemiSubsetWoff from './assets/fonts/AvenirNextLTPro-Demi-subset.woff';

import AvenirNextBoldSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Bold-subset.woff2';
import AvenirNextBoldSubsetWoff from './assets/fonts/AvenirNextLTPro-Bold-subset.woff';

// Why are the @font-face rules extracted to be used on its own? 
// GlobalStyle causes custom fonts to be re-requested when
// it get rerendered, or some other possible behaviors like
// rehyration, component state change.
// This will cause font loading problems like FOIT and FOUT. Bad bad.
export const fontFaceRules = `
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
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif;
    font-weight: 500;
  }
  
  a {
    text-decoration: none;
  }
`;

const sizes = {
  l: 1000,
  m: 700,
  s: 576,
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

export default GlobalStyle;