import React, { useState, useEffect } from 'react';
import Sorter from './Sorter';
import Row from './Row';
import clsx from 'clsx';
import { SortOption } from '@/types';

const Table = ({
  data,
  setData,
  isLoading,
  rowLength,
  activeDataSource,
}: {
  data: any;
  setData: any;
  isLoading: boolean;
  rowLength: number;
  activeDataSource: string;
}) => {
  const [lastSortOption, setLastSortOption] = useState<SortOption>('default');

  const handleSortChange = (sortOption: SortOption) => {
    if (sortOption === 'highToLow') {
      setData(
        data.sort((a: any, b: any) => b.usd_24h_change - a.usd_24h_change)
      );
      setLastSortOption('highToLow');
    } else if (sortOption === 'lowToHigh') {
      setData(
        data.sort((a: any, b: any) => a.usd_24h_change - b.usd_24h_change)
      );
      setLastSortOption('lowToHigh');
    } else if (sortOption === 'default') {
      setData(
        data.sort((a: any, b: any) => b.usd_market_cap - a.usd_market_cap)
      );
      setLastSortOption('default');
    }
  };

  const handleSortClick = () => {
    if (lastSortOption === 'default') {
      handleSortChange('highToLow');
    } else if (lastSortOption === 'highToLow') {
      handleSortChange('lowToHigh');
    } else if (lastSortOption === 'lowToHigh') {
      handleSortChange('default');
    }
  };

  useEffect(() => {
    setLastSortOption('default');
  }, [activeDataSource]);

  return (
    <table
      className={clsx(
        'w-[80%] max-w-[720px] rounded-[10px] box-border bg-[var(--bg-table)] mt-0 mx-auto mb-10',
        'shadow-[0_2px_27px_7px_rgba(3,169,245,0.13)] border-collapse',
        'max-[700px]:w-[90%] max-[700px]:text-[14px] text-left',
        '[&_th]:pl-[30px] [&_th]:border-[var(--color-table-border)] [&_th]:border [&_th]:leading-[16.1px]',
        '[&_td]:pl-[30px] [&_td]:border-[var(--color-table-border)] [&_td]:border [&_td]:leading-[16.1px]',
        '[&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0',
        '[&_th:first-child]:border-l-0 [&_td:first-child]:border-l-0',
        '[&_th:last-child]:w-[25%] [&_td:last-child]:w-[25%]',
        'max-[700px]:[&_th]:px-[12px] max-[700px]:[&_td]:px-[12px]'
      )}
    >
      <thead>
        <tr className="h-[65px] max-[700px]:h-[60px]">
          <th
            className={clsx(
              'font-extrabold text-[var(--text-header-cell-main)] text-[24px]',
              'max-[800px]:text-[20px] max-[700px]:text-[18px] max-[550px]:text-[16px]',
              '!border-t-0'
            )}
          >
            Name
          </th>
          <th
            className={clsx(
              'font-extrabold text-[var(--text-header-cell)] text-[24px]',
              'max-[800px]:text-[20px] max-[700px]:text-[18px] max-[550px]:text-[16px]',
              '!border-t-0'
            )}
          >
            Price
          </th>
          <th
            className={clsx(
              'font-extrabold text-[var(--text-header-cell)] text-[24px] relative',
              'max-[800px]:text-[20px] max-[700px]:text-[18px] max-[550px]:text-[16px]',
              '!border-t-0'
            )}
            onClick={handleSortClick}
            style={{
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            Change
            <Sorter lastSortOption={lastSortOption} />
          </th>
        </tr>
      </thead>
      <tbody className="text-[var(--text-tbody)] [&>*:nth-child(odd)]:bg-[var(--bg-table-row-odd)] [&>*:last-child>td]:border-b-0">
        {!isLoading
          ? data.map((coin: any) => (
              <Row
                key={`CoinRow-${coin.id}`}
                isLoading={isLoading}
                name={coin.name}
                symbol={coin.symbol.toUpperCase()}
                priceUsd={coin.usd}
                priceBtc={coin.btc}
                priceChange={coin.usd_24h_change}
              />
            ))
          : [...Array(rowLength)].map((e, i) => (
              <Row key={`CoinRow-${i}`} isLoading={isLoading} />
            ))}
      </tbody>
    </table>
  );
};

export default Table;
