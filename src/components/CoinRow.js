import React from 'react';
import ContentLoader, { Facebook } from 'react-content-loader'

const MyFacebookLoader = () => <Facebook />

const MyLoader = props => (
	<ContentLoader
		height={160}
		width={400}
		speed={1.5}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<circle cx="35" cy="35" r="8" />
		<rect x="50" y="30" rx="5" ry="5" width="220" height="10" />
		<circle cx="35" cy="65" r="8" />
		<rect x="50" y="60" rx="5" ry="5" width="220" height="10" />
		<circle cx="35" cy="95" r="8" />
		<rect x="50" y="90" rx="5" ry="5" width="220" height="10" />
		<circle cx="35" cy="125" r="8" />
		<rect x="50" y="120" rx="5" ry="5" width="220" height="10" />
	</ContentLoader>
)

const CoinRow = (props) => {
  let className = 'pc';
  if (props.priceChange > 0) {
    className += ' pc--green';
  } else if (props.priceChange < 0) {
    className += ' pc--red';
  }
  const priceSats = Math.floor(props.priceSats * 100000000);
  return (
    <React.Fragment>
    {
      props.coinsDataLoaded
      ?
      (
        <tr>
          <td>{props.name} ({props.symbol})</td>
          <td>${props.name === 'Bitcoin' ? props.priceUsd : `${props.priceUsd} / ${priceSats}`}</td>
          <td className={className}>{props.priceChange}</td>
        </tr>
      )
      :
      <tr><td>no data yet</td></tr>
    }
    </React.Fragment>
  );
};

// const CoinRow = (props) => {
//   let className = 'pc';
//   if (props.priceChange > 0) {
//     className += ' pc--green';
//   } else if (props.priceChange < 0) {
//     className += ' pc--red';
//   }
//   const priceSats = Math.floor(props.priceSats * 100000000);
//   return (
//     <tr>
//       <td>{props.name} ({props.symbol})</td>
//       <td>${props.name === 'Bitcoin' ? props.priceUsd : `${props.priceUsd} / ${priceSats}`}</td>
//       <td className={className}>{props.priceChange}</td>
//     </tr>
//   );
// };

export default CoinRow;
