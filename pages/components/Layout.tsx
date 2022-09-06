import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: any
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
