import React from 'react';
import ContentLoader from 'react-content-loader';
import clsx from 'clsx';

const NameLoader = (props: any) => (
  <ContentLoader
    height={50}
    width={253}
    speed={1.5}
    backgroundColor="var(--color-loader-primary)"
    foregroundColor="var(--color-loader-secondary)"
    uniqueKey="NameLoaderKey"
    {...props}
  >
    <rect x="0" y="12.5" rx="5" ry="5" width="110" height="25" />
  </ContentLoader>
);

const PriceLoader = (props = {}) => (
  <ContentLoader
    height={43}
    width={225}
    speed={1.5}
    backgroundColor="var(--color-loader-primary)"
    foregroundColor="var(--color-loader-secondary)"
    uniqueKey="PriceLoaderKey"
    {...props}
  >
    <rect x="0" y="9" rx="5" ry="5" width="150" height="25" />
  </ContentLoader>
);

const ChangeLoader = (props = {}) => (
  <ContentLoader
    height={38}
    width={149}
    speed={1.5}
    backgroundColor="var(--color-loader-primary)"
    foregroundColor="var(--color-loader-secondary)"
    uniqueKey="ChangeLoaderKey"
    {...props}
  >
    <rect x="0" y="6" rx="5" ry="5" width="50" height="25" />
  </ContentLoader>
);

type RowProps = {
  key: string;
  isLoading: boolean;
  name?: string;
  symbol?: string;
  priceUsd?: number;
  priceBtc?: number;
  priceChange?: number;
};

const Row = ({
  name,
  symbol,
  priceBtc,
  priceChange,
  isLoading,
  ...rest
}: RowProps) => {
  const precisionRound = (number: number, precision: number) => {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  };
  let priceUsd = rest.priceUsd || 0;
  // const priceUsd = precisionRound(rest.priceUsd, 3);
  if (priceUsd > 10) {
    priceUsd = precisionRound(priceUsd, 2);
  } else if (priceUsd > 1) {
    priceUsd = precisionRound(priceUsd, 3);
  } else if (priceUsd > 0.2) {
    priceUsd = precisionRound(priceUsd, 4);
  } else {
    priceUsd = precisionRound(priceUsd, 5);
  }
  priceChange = precisionRound(priceChange || 0, 2);
  return (
    <React.Fragment>
      {!isLoading ? (
        <tr className="h-[50px] max-[700px]:h-[46px] leading-[0]">
          <td>
            {name} ({symbol})
          </td>
          {name === 'Bitcoin' || !priceBtc ? (
            <td>${priceUsd}</td>
          ) : (
            <td>
              ${priceUsd} / {priceBtc}
            </td>
          )}
          <td
            className={clsx(
              priceChange > 0 && 'text-[var(--text-change-green)]',
              priceChange < 0 && 'text-[var(--text-change-red)]'
            )}
          >
            {priceChange}
          </td>
        </tr>
      ) : (
        <tr className="h-[50px] max-[700px]:h-[46px] leading-[0] svg-tr">
          <td>
            <NameLoader />
          </td>
          <td>
            <PriceLoader />
          </td>
          <td>
            <ChangeLoader />
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default Row;
