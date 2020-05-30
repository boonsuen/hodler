import React from 'react';
import styled from 'styled-components';
import ContentLoader, { Facebook } from 'react-content-loader'

const MyFacebookLoader = () => <Facebook />

const NameLoader = props => (
	<ContentLoader
		height={50}
		width={253}
		speed={1.5}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
    uniquekey="NameLoaderKey"
		{...props}
	>
		<rect x="0" y="12.5" rx="5" ry="5" width="110" height="25" />
	</ContentLoader>
);

const PriceLoader = props => (
  <ContentLoader
    height={43}
		width={225}
		speed={1.5}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
    uniquekey="PriceLoaderKey"
		{...props}
	>
		<rect x="0" y="9" rx="5" ry="5" width="150" height="25" />
	</ContentLoader>
);

const ChangeLoader = props => (
	<ContentLoader
		height={38}
		width={149}
		speed={1.5}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
    uniquekey="ChangeLoaderKey"
		{...props}
	>
		<rect x="0" y="6" rx="5" ry="5" width="50" height="25" />
	</ContentLoader>
);

const PriceChange = styled.td`
  color: ${props => {
		if (props.value > 0) {
			return '#4ae264';
		} else if (props.value < 0) {
			return '#ff8282';
		}
	}}
`;

const Row = ({name, symbol, priceBtc, priceChange, isLoading, ...rest}) => {
	const precisionRound = (number, precision) => {
	  const factor = Math.pow(10, precision);
	  return Math.round(number * factor) / factor;
	}
	let priceUsd = rest.priceUsd;
	// const priceUsd = precisionRound(rest.priceUsd, 3);
	if (priceUsd > 10) {
		priceUsd = precisionRound(priceUsd, 2);
	} else if (priceUsd > 1) {
		priceUsd = precisionRound(priceUsd, 3);
	} else if (priceUsd > 0.2 ) {
		priceUsd = precisionRound(priceUsd, 4);
	} else {
		priceUsd = precisionRound(priceUsd, 5);
	}
	priceChange = precisionRound(priceChange, 2);
  return (
    <React.Fragment>
    {
      !isLoading
      ?
      (
        <tr>
          <td>{name} ({symbol})</td>
          {name === 'Bitcoin' ? <td>${priceUsd}</td> : <td>${priceUsd} / {priceBtc}</td>}
          <PriceChange value={priceChange}>{priceChange}</PriceChange>
        </tr>
      )
      :
      <tr className="svg-tr">
        <td><NameLoader /></td>
        <td><PriceLoader /></td>
        <td><ChangeLoader /></td>
      </tr>
    }
    </React.Fragment>
  );
};

export default Row;