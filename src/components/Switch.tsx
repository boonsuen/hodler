import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Switch = () => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        'mt-0 mx-auto mb-[30px] flex w-[199px] justify-center max-[550px]:w-[180px]'
      )}
    >
      <Link
        className={clsx(
          'h-[45px] w-[100px] text-center max-[550px]:text-[14px] text-[var(--color-navlink)]',
          'bg-[var(--bg-navlink-inactive)] leading-[45px] max-[550px]:h-[45px]',
          'border border-[var(--color-navlink)] box-border',
          'transition-all duration-200',
          {
            'text-white bg-[var(--color-navlink)]': pathname === '/',
          },
          {
            'hover:bg-[var(--bg-navlink-hover)]': pathname !== '/',
          }
        )}
        href="/"
      >
        Main
      </Link>
      <Link
        className={clsx(
          'h-[45px] w-[100px] text-center max-[550px]:text-[14px] text-[var(--color-navlink)]',
          'bg-[var(--bg-navlink-inactive)] leading-[45px] max-[550px]:h-[45px]',
          'border border-[var(--color-navlink)] box-border',
          'transition-all duration-200',
          {
            'text-white bg-[var(--color-navlink)]': pathname === '/watch',
          },
          {
            'hover:bg-[var(--bg-navlink-hover)]': pathname !== '/watch',
          }
        )}
        href="/watch"
      >
        Watching
      </Link>
    </div>
  );
};

export default Switch;
