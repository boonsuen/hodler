import Header from './Header';
import Switch from './Switch';
import FooterLinks from './FooterLinks';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Switch />
      {children}
      <FooterLinks />
    </>
  );
}
