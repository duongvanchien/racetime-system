import { Outlet } from 'react-router-dom';

import Header from './header';
import './layout.scss';

const Layout = () => {
  return (
    <div>
      <div>
        <Header />
        <div className="pr-25 pl-25 pb-25">
          <Outlet />
          <div style={{ position: 'absolute', bottom: '10px' }}>
            © 2023. Trackify
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
