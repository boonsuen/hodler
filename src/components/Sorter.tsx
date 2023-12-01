import { SortOption } from '@/types';
import clsx from 'clsx';

const Sorter = ({ lastSortOption }: { lastSortOption: SortOption }) => (
  <svg
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 194.2 348.7"
    className={clsx(
      'absolute right-[24px] top-[18px] w-[15px] ml-[10px]',
      'max-[860px]:hidden'
    )}
  >
    <path
      className={clsx(
        lastSortOption === 'highToLow'
          ? 'fill-[var(--color-sorter-active)]'
          : 'fill-[var(--color-sorter)]'
      )}
      d="M86.2,5.6l-83.8,118c-6.3,8.8,0,21,10.9,21h167.5c10.8,0,17.1-12.2,10.9-21L108,5.6
      C102.7-1.9,91.6-1.9,86.2,5.6z"
    />
    <path
      className={clsx(
        lastSortOption === 'lowToHigh'
          ? 'fill-[var(--color-sorter-active)]'
          : 'fill-[var(--color-sorter)]'
      )}
      d="M108,343.1l83.8-118c6.3-8.8,0-21-10.9-21H13.3c-10.8,0-17.1,12.2-10.9,21l83.8,118
      C91.6,350.5,102.7,350.5,108,343.1z"
    />
  </svg>
);

export default Sorter;
