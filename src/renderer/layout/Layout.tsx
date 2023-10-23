import { Outlet } from 'react-router-dom';

import './layout.scss';
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <div>
        <Header />
        <div className="pr-25 pl-25 pb-25">
          <div className="mt-24">
            <Outlet />
          </div>
          {/* <div style={{ position: 'absolute', bottom: '10px' }}>
            © 2023. Trackify
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
