import Header from './Header';
import Switch from './Switch';
import FooterLinks from './FooterLinks';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Switch />
      {children}
      <FooterLinks />
    </>
  );
}