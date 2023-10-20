import { Outlet } from 'react-router-dom';
import './Layout.scss';

const Header = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
