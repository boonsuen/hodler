import React from 'react';
import ContentLoader, { Facebook } from 'react-content-loader'

const MyFacebookLoader = () => <Facebook />

const NameLoader = props => (
	<ContentLoader
		height={50}
		width={253}
		speed={1.5}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
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
		{...props}
	>
		<rect x="0" y="6" rx="5" ry="5" width="50" height="25" />
	</ContentLoader>
);

const CoinRow = ({name, symbol, priceUsd, priceChange, coinsDataLoaded, ...rest}) => {
  let className = 'pc';
  if (priceChange > 0) {
    className += ' pc--green';
  } else if (priceChange < 0) {
    className += ' pc--red';
  }
  const priceSats = Math.floor(rest.priceSats * 100000000);
  return (
    <React.Fragment>
    {
      coinsDataLoaded
      ?
      (
        <tr>
          <td>{name} ({symbol})</td>
          <td>${name === 'Bitcoin' ? priceUsd : `${priceUsd} / ${priceSats}`}</td>
          <td className={className}>{priceChange}</td>
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

export default CoinRow;
