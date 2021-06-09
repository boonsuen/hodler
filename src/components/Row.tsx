import React from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader'

const NameLoader = props => (
	<ContentLoader
		height={50}
		width={253}
		speed={1.5}
		primaryColor="var(--color-loader-primary)"
		secondaryColor="var(--color-loader-secondary)"
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
		primaryColor="var(--color-loader-primary)"
		secondaryColor="var(--color-loader-secondary)"
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
		primaryColor="var(--color-loader-primary)"
		secondaryColor="var(--color-loader-secondary)"
    uniquekey="ChangeLoaderKey"
		{...props}
	>
		<rect x="0" y="6" rx="5" ry="5" width="50" height="25" />
	</ContentLoader>
);

const PriceChange = styled.td<{
	value: number;
}>`
  color: ${props => {
		if (props.value > 0) {
			return 'var(--text-change-green)';
		} else if (props.value < 0) {
			return 'var(--text-change-red)';
		}
	}}
`;

type RowProps = {
	key: string;
	isLoading: boolean;
	name?: string;
	symbol?: string;
	priceUsd?: number;
	priceBtc?: number;
	priceChange?: number;
}

const Row = ({name, symbol, priceBtc, priceChange, isLoading, ...rest}: RowProps) => {
	const precisionRound = (number: number, precision) => {
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
          {(name === 'Bitcoin' || !priceBtc) ? <td>${priceUsd}</td> : <td>${priceUsd} / {priceBtc}</td>}
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