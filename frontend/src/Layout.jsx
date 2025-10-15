// Create a new file: Components/Layout.jsx
import { Outlet } from 'react-router-dom';
import { Header } from './Components/Header';
import Footer from './Components/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children || <Outlet />}
      </main>
      <Footer />
    </>
  );
};

export default Layout;