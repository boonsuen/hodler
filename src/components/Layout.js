import Header from './Header';
import Switch from './Switch';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Switch />
      {children}
    </>
  );
}